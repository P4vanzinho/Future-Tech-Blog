import Image from "next/image";
import { Post as PostType } from "@/types/post";
import { LikeIcon } from "@/components/common/icons/LikeIcon";
import { SocialStatButton } from "./SocialStatButton";
import { SharePopover } from "./SharePopover";
import { LinkButton } from "./LinkButton";
import { formatNumber } from "@/utils/formatter";
import { getPostUrl } from "@/utils/posts";

interface PostProps {
  post: PostType;
  onLike?: (postId: string) => void;
}

export function Post({ post, onLike }: PostProps) {
  return (
    <div className="flex flex-col py-10 lg:h-full lg:py-[3.75rem] 2xl:py-[5rem]">
      <Image
        src={post.image}
        alt={post.imageAlt}
        width={1000}
        height={1000}
        className="h-[13.3125rem] w-full rounded-lg object-cover lg:h-[13.3125rem] lg:flex-shrink-0"
      />
      <div className="flex flex-col gap-2 pt-4 pb-1">
        <h2 className="font-sans text-[1.25rem] leading-[150%] font-semibold text-white">
          {post.title}
        </h2>
      </div>

      <div className="flex gap-5 pb-[1.125rem]">
        <div className="flex flex-col">
          <span className="text-grey-60 font-sans text-[0.875rem] leading-[150%]">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 lg:mt-auto">
        <div className="flex items-center gap-2 2xl:gap-[0.625rem]">
          <SocialStatButton
            icon={
              <LikeIcon
                filled={post.isLiked}
                className="h-5 w-5 2xl:h-6 2xl:w-6"
              />
            }
            value={formatNumber(post.likes)}
            transparent={!post.isLiked}
            onClick={onLike ? () => onLike(post.id) : undefined}
          />
          <SharePopover
            url={getPostUrl(post.slug)}
            title={post.title}
            shareCount={post.shares}
          />
        </div>
        <LinkButton variant="regular" href={`/posts/${post.slug}`} />
      </div>
    </div>
  );
}
