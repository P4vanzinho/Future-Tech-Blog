import { SocialStatButton } from "@/components/blog/SocialStatButton";
import { LikeIcon } from "@/components/common/icons/LikeIcon";
import { EyeIcon } from "@/components/common/icons/EyeIcon";
import { DirectIcon } from "@/components/common/icons/DirectIcon";
import type { ArticleSocialStatsProps } from "./types";

export function ArticleSocialStats({
  stats,
  className = "",
  ...props
}: ArticleSocialStatsProps) {
  return (
    <div className={className} {...props}>
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
