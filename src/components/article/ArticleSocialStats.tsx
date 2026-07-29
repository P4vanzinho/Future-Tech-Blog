"use client";

import { toast } from "sonner";
import { SocialStatButton } from "@/components/blog/SocialStatButton";
import { LikeIcon } from "@/components/common/icons/LikeIcon";
import { EyeIcon } from "@/components/common/icons/EyeIcon";
import { SharePopover } from "@/components/blog/SharePopover";
import type { ArticleSocialStatsProps } from "./types";
import { formatNumber } from "@/utils/formatter";
import { useArticleLikes } from "@/hooks/useArticleLikes";
import { useArticleEngagement } from "@/hooks/useArticleEngagement";

export function ArticleSocialStats({
  article: initialArticle,
  className = "",
  ...props
}: ArticleSocialStatsProps) {
  const { articles, toggleArticleLike } = useArticleLikes([initialArticle]);
  const article = articles[0] ?? initialArticle;
  const { state } = useArticleEngagement(article);

  const handleLike = async () => {
    try {
      await toggleArticleLike(article);
    } catch {
      toast.error("Nao foi possivel atualizar o like.");
    }
  };

  return (
    <div className={className} {...props}>
      <SocialStatButton
        icon={
          <LikeIcon
            filled={article.isLiked}
            className="h-[1.625rem] w-[1.625rem]"
          />
        }
        value={formatNumber(article.likes)}
        transparent={!article.isLiked}
        onClick={handleLike}
      />
      <SocialStatButton
        icon={<EyeIcon className="h-[1.625rem] w-[1.625rem]" />}
        value={formatNumber(state.views)}
      />
      <SharePopover article={{ ...article, shares: state.shares }} />
    </div>
  );
}
