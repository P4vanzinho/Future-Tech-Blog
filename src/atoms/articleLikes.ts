import { atom } from "jotai";
import { persistArticleLike } from "@/services/articleLikes";
import type { Article } from "@/types/article";

export interface ArticleLikeState {
  likes: number;
  isLiked: boolean;
}

export const articleLikeStatesAtom = atom<Record<string, ArticleLikeState>>({});

const confirmedArticleLikeStatesAtom = atom<Record<string, ArticleLikeState>>(
  {}
);
const pendingLikeDeltasAtom = atom<Record<string, number>>({});
const inFlightArticleIdsAtom = atom<Set<string>>(new Set<string>());

function mergeArticleLikeState(
  states: Record<string, ArticleLikeState>,
  articleId: string,
  state: ArticleLikeState
) {
  return { ...states, [articleId]: state };
}

export const registerArticleLikesAtom = atom(
  null,
  (get, set, articles: Article[]) => {
    let nextStates = get(articleLikeStatesAtom);

    for (const article of articles) {
      if (nextStates[article.id]) {
        continue;
      }

      const initialState = {
        likes: article.likes,
        isLiked: Boolean(article.isLiked),
      };
      set(confirmedArticleLikeStatesAtom, (states) =>
        mergeArticleLikeState(states, article.id, initialState)
      );
      nextStates = mergeArticleLikeState(nextStates, article.id, initialState);
    }

    set(articleLikeStatesAtom, nextStates);
  }
);

export const toggleArticleLikeAtom = atom(
  null,
  async (get, set, article: Article) => {
    const articleId = article.id;
    const currentState = get(articleLikeStatesAtom)[articleId] ?? {
      likes: article.likes,
      isLiked: Boolean(article.isLiked),
    };
    const delta = currentState.isLiked ? -1 : 1;
    const optimisticState = {
      likes: Math.max(0, currentState.likes + delta),
      isLiked: !currentState.isLiked,
    };

    set(pendingLikeDeltasAtom, (deltas) => ({
      ...deltas,
      [articleId]: (deltas[articleId] ?? 0) + delta,
    }));
    set(articleLikeStatesAtom, (states) =>
      mergeArticleLikeState(states, articleId, optimisticState)
    );

    if (get(inFlightArticleIdsAtom).has(articleId)) {
      return;
    }

    set(inFlightArticleIdsAtom, (articleIds) =>
      new Set(articleIds).add(articleId)
    );
    try {
      while ((get(pendingLikeDeltasAtom)[articleId] ?? 0) !== 0) {
        const requestDelta = get(pendingLikeDeltasAtom)[articleId] ?? 0;
        set(pendingLikeDeltasAtom, (deltas) => ({
          ...deltas,
          [articleId]: 0,
        }));

        const result = await persistArticleLike({
          articleId,
          delta: requestDelta,
        });
        const confirmedState = {
          likes: result.likes,
          isLiked: result.likedByOrigin,
        };
        set(confirmedArticleLikeStatesAtom, (states) =>
          mergeArticleLikeState(states, articleId, confirmedState)
        );

        const queuedDelta = get(pendingLikeDeltasAtom)[articleId] ?? 0;
        const visibleState = {
          likes: Math.max(0, confirmedState.likes + queuedDelta),
          isLiked: queuedDelta === 0 ? confirmedState.isLiked : queuedDelta > 0,
        };
        set(articleLikeStatesAtom, (states) =>
          mergeArticleLikeState(states, articleId, visibleState)
        );
      }
    } catch (error) {
      set(pendingLikeDeltasAtom, (deltas) => ({
        ...deltas,
        [articleId]: 0,
      }));
      const confirmedState = get(confirmedArticleLikeStatesAtom)[articleId];
      if (confirmedState) {
        set(articleLikeStatesAtom, (states) =>
          mergeArticleLikeState(states, articleId, confirmedState)
        );
      }
      throw error;
    } finally {
      set(inFlightArticleIdsAtom, (articleIds) => {
        const nextArticleIds = new Set(articleIds);
        nextArticleIds.delete(articleId);
        return nextArticleIds;
      });
    }
  }
);
