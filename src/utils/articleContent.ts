import {
  MINIMUM_READING_TIME_MINUTES,
  WORDS_PER_MINUTE,
} from "@/constants/article";
import type { ArticleHeading } from "@/types/article";
import type {
  ArticleContentBlock,
  ArticleLexicalNode,
  ArticleLexicalState,
} from "@/types/articleDetail";

export function getLexicalNodeText(node: ArticleLexicalNode): string {
  if (typeof node.text === "string") {
    return node.text;
  }

  return (node.children ?? []).map(getLexicalNodeText).join(" ").trim();
}

export function createHeadingSlug(value: string): string {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function createUniqueHeadingId(
  title: string,
  occurrences: Map<string, number>
) {
  const baseId = createHeadingSlug(title);
  const occurrence = (occurrences.get(baseId) ?? 0) + 1;
  occurrences.set(baseId, occurrence);
  return occurrence === 1 ? baseId : `${baseId}-${occurrence}`;
}

function visitNodes(
  nodes: ArticleLexicalNode[],
  visitor: (node: ArticleLexicalNode) => void
) {
  for (const node of nodes) {
    visitor(node);
    visitNodes(node.children ?? [], visitor);
  }
}

export function extractArticleHeadings(
  blocks: ArticleContentBlock[]
): ArticleHeading[] {
  const occurrences = new Map<string, number>();
  const headings: ArticleHeading[] = [];

  for (const block of blocks) {
    if (block.type !== "richText") continue;

    visitNodes(block.content.root.children, (node) => {
      if (node.type !== "heading" || (node.tag !== "h2" && node.tag !== "h3")) {
        return;
      }

      const title = getLexicalNodeText(node).trim();
      if (!title) return;

      headings.push({
        id: createUniqueHeadingId(title, occurrences),
        title,
        level: node.tag === "h2" ? 2 : 3,
      });
    });
  }

  return headings;
}

export function addHeadingIdsToBlocks(
  blocks: ArticleContentBlock[]
): ArticleContentBlock[] {
  const occurrences = new Map<string, number>();

  const cloneNode = (node: ArticleLexicalNode): ArticleLexicalNode => {
    const children = node.children?.map(cloneNode);
    const cloned: ArticleLexicalNode = {
      ...node,
      ...(children ? { children } : {}),
    };

    if (node.type === "heading" && (node.tag === "h2" || node.tag === "h3")) {
      const title = getLexicalNodeText(node).trim();
      if (title) {
        cloned.anchorId = createUniqueHeadingId(title, occurrences);
      }
    }

    return cloned;
  };

  return blocks.map((block) =>
    block.type === "richText"
      ? {
          ...block,
          content: {
            ...block.content,
            root: cloneNode(block.content.root) as ArticleLexicalState["root"],
          },
        }
      : block
  );
}

export function extractArticleText(blocks: ArticleContentBlock[]): string {
  return blocks
    .flatMap((block) =>
      block.type === "richText"
        ? [getLexicalNodeText(block.content.root)]
        : [block.caption ?? "", block.imageAlt]
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateReadingTimeMinutes(
  blocks: ArticleContentBlock[]
): number {
  const text = extractArticleText(blocks);
  const wordCount = text ? text.split(/\s+/).length : 0;
  return Math.max(
    MINIMUM_READING_TIME_MINUTES,
    Math.ceil(wordCount / WORDS_PER_MINUTE)
  );
}
