import { atom } from "jotai";
import type { Article } from "@/types/article";
import type {
  ArticleEngagementState,
  ShareProvider,
} from "@/types/articleEngagement";
import {
  getArticleEngagement,
  registerArticleShare,
  registerArticleView,
} from "@/services/articleEngagement";
import { reconcileArticleLikeAtom } from "@/atoms/articleLikes";

export const articleEngagementStatesAtom = atom<
  Record<string, ArticleEngagementState>
>({});

const viewRequestsInFlightAtom = atom<Set<string>>(new Set<string>());

function mergeEngagementState(
  states: Record<string, ArticleEngagementState>,
  articleId: string,
  state: ArticleEngagementState
) {
  return { ...states, [articleId]: state };
}

export const registerArticleEngagementAtom = atom(
  null,
  (get, set, articles: Article[]) => {
    let states = get(articleEngagementStatesAtom);

    for (const article of articles) {
      if (states[article.id]) continue;
      states = mergeEngagementState(states, article.id, {
        views: article.views,
        shares: article.shares,
        sharedProviders: [],
      });
    }

    set(articleEngagementStatesAtom, states);
  }
);

export const hydrateArticleEngagementAtom = atom(
  null,
  async (_get, set, articleId: string) => {
    const result = await getArticleEngagement(articleId);
    set(reconcileArticleLikeAtom, {
      articleId,
      likes: result.likes,
      isLiked: result.likedByOrigin,
    });
    set(articleEngagementStatesAtom, (states) =>
      mergeEngagementState(states, articleId, {
        views: result.views,
        shares: result.shares,
        sharedProviders: result.sharedProviders,
      })
    );
    return result;
  }
);

export const recordArticleViewAtom = atom(
  null,
  async (get, set, articleId: string) => {
    if (get(viewRequestsInFlightAtom).has(articleId)) return;

    set(viewRequestsInFlightAtom, (ids) => new Set(ids).add(articleId));
    try {
      const result = await registerArticleView(articleId);
      set(articleEngagementStatesAtom, (states) => {
        const current = states[articleId] ?? {
          views: 0,
          shares: 0,
          sharedProviders: [],
        };
        return mergeEngagementState(states, articleId, {
          ...current,
          views: result.views,
        });
      });
    } finally {
      set(viewRequestsInFlightAtom, (ids) => {
        const next = new Set(ids);
        next.delete(articleId);
        return next;
      });
    }
  }
);

export const recordArticleShareAtom = atom(
  null,
  async (_get, set, input: { articleId: string; provider: ShareProvider }) => {
    const result = await registerArticleShare(input.articleId, input.provider);
    set(articleEngagementStatesAtom, (states) => {
      const current = states[input.articleId] ?? {
        views: 0,
        shares: 0,
        sharedProviders: [],
      };
      const sharedProviders = current.sharedProviders.includes(input.provider)
        ? current.sharedProviders
        : [...current.sharedProviders, input.provider];
      return mergeEngagementState(states, input.articleId, {
        ...current,
        shares: result.shares,
        sharedProviders,
      });
    });
    return result;
  }
);
