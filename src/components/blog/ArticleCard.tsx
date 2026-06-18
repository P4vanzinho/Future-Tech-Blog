import Image from "next/image";
import type { Article } from "@/types/article";
import { LikeIcon } from "@/components/common/icons/LikeIcon";
import { SocialStatButton } from "./SocialStatButton";
import { SharePopover } from "./SharePopover";
import { LinkButton } from "./LinkButton";
import { formatNumber } from "@/utils/formatter";

interface ArticleCardProps {
  article: Article;
  onLike?: (articleId: string) => void;
}

export function ArticleCard({ article, onLike }: ArticleCardProps) {
  return (
    <div className="flex flex-col py-10 lg:h-full lg:py-[3.75rem] 2xl:py-[5rem]">
      <Image
        src={article.image}
        alt={article.imageAlt}
        width={1000}
        height={1000}
        className="h-[13.3125rem] w-full rounded-lg object-cover lg:h-[13.3125rem] lg:flex-shrink-0"
      />
      <div className="flex flex-col gap-2 pt-4 pb-1">
        <h2 className="font-sans text-[1.25rem] leading-[150%] font-semibold text-white">
          {article.title}
        </h2>
      </div>

      <div className="flex gap-5 pb-[1.125rem]">
        <div className="flex flex-col">
          <span className="text-grey-60 font-sans text-[0.875rem] leading-[150%]">
            {article.category}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between lg:mt-auto lg:gap-10 2xl:gap-[3.125rem]">
        <div className="flex items-center gap-2 2xl:gap-[0.625rem]">
          <SocialStatButton
            icon={
              <LikeIcon
                filled={article.isLiked}
                className="h-5 w-5 2xl:h-6 2xl:w-6"
              />
            }
            value={formatNumber(article.likes)}
            transparent={!article.isLiked}
            onClick={onLike ? () => onLike(article.id) : undefined}
          />
          <SharePopover article={article} />
        </div>
        <LinkButton variant="regular" href={`/article/${article.slug}`} />
      </div>
    </div>
  );
}
