import { SocialStatButton } from "@/components/blog/SocialStatButton";
import { LikeIcon } from "@/components/common/icons/LikeIcon";
import { EyeIcon } from "@/components/common/icons/EyeIcon";
import { DirectIcon } from "@/components/common/icons/DirectIcon";
import type { ArticleSocialStats as ArticleSocialStatsType } from "@/types/article";

interface ArticleSocialStatsProps {
  stats: ArticleSocialStatsType;
  className?: string;
}

export function ArticleSocialStats({
  stats,
  className = "",
}: ArticleSocialStatsProps) {
  return (
    <div className={className}>
      <SocialStatButton
        icon={<LikeIcon filled className="h-[1.625rem] w-[1.625rem]" />}
        value={stats.likes}
      />
      <SocialStatButton
        icon={<EyeIcon className="h-[1.625rem] w-[1.625rem]" />}
        value={stats.views}
      />
      <SocialStatButton
        icon={<DirectIcon className="h-[1.625rem] w-[1.625rem]" />}
        value={stats.shares}
      />
    </div>
  );
}
