import { createElement } from "react";
import Image from "next/image";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { ArticleContentBlock } from "@/types/articleDetail";

const articleConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const anchorId = (node as typeof node & { anchorId?: unknown }).anchorId;
    return createElement(
      node.tag,
      {
        id: typeof anchorId === "string" ? anchorId : undefined,
        className:
          node.tag === "h2"
            ? "scroll-mt-28 text-xl font-medium text-white lg:text-2xl"
            : "scroll-mt-28 text-lg font-medium text-white lg:text-xl",
      },
      nodesToJSX({ nodes: node.children })
    );
  },
});

interface ArticleRichContentProps {
  blocks: ArticleContentBlock[];
}

export function ArticleRichContent({ blocks }: ArticleRichContentProps) {
  return (
    <div className="article-rich-content flex flex-col gap-10">
      {blocks.map((block) => {
        if (block.type === "image") {
          return (
            <figure key={block.id} className="flex flex-col gap-3">
              <Image
                src={block.image}
                alt={block.imageAlt}
                width={1200}
                height={675}
                className="h-auto w-full rounded-lg object-cover"
              />
              {block.caption && (
                <figcaption className="text-grey-60 text-sm">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return (
          <RichText
            key={block.id}
            data={block.content as unknown as SerializedEditorState}
            converters={articleConverters}
            className="text-grey-60 flex flex-col gap-4 text-sm leading-[1.7] lg:text-base"
          />
        );
      })}
    </div>
  );
}
