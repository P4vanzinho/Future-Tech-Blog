"use client";

import { useState } from "react";
import { CategoryFilterCarouselMobile } from "./CategoryFilterCarouselMobile";
import { CategoryFilterButtonsRow } from "./CategoryFilterButtonsRow";
import { Separator } from "../common/Separator";
import Image from "next/image";
import defaultUserImage from "../../../public/mocks/imageUser.png";
import { LinkButton } from "../blog/LinkButton";
import { SocialStatButton } from "../blog/SocialStatButton";
import { SharePopover } from "../blog/SharePopover";
import { CommentIcon, LikeIcon } from "../common/icons";
import { regularPosts } from "@/data/mocks/posts";
import { formatDate, formatNumber } from "@/utils/formatter";
import { getPostUrl } from "@/utils/posts";
import { Post } from "@/types/post";

function togglePostLike(posts: Post[], postId: string): Post[] {
  return posts.map((p) =>
    p.id === postId
      ? {
          ...p,
          isLiked: !p.isLiked,
          likes: p.likes + (p.isLiked ? -1 : 1),
        }
      : p
  );
}

export function ArticlesPreviewByCategorySection() {
  const [posts, setPosts] = useState<Post[]>(() => [...regularPosts]);

  const handleLike = (postId: string) => {
    setPosts((prev) => togglePostLike(prev, postId));
  };
  return (
    <section className="bg-dark-10 -mx-4 px-4 md:-mx-5 lg:-mx-20 lg:px-20 2xl:-mx-40 2xl:px-40">
      <div className="py-5 lg:py-10 2xl:py-[3.125rem]">
        <div className="flex flex-col gap-6">
          <CategoryFilterCarouselMobile />
          <CategoryFilterButtonsRow />
        </div>
      </div>
      <Separator />

      <div className="flex flex-col gap-6 py-10">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-6">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[384fr_942fr_220fr] md:items-stretch md:gap-4">
              <div className="flex w-full justify-between md:contents">
                <div className="flex shrink-0 items-start gap-4">
                  <div className="bg-dark-20 h-[3.75rem] w-[3.75rem] shrink-0 rounded-full xl:h-20 xl:w-20">
                    <Image
                      src={post.authorImage ?? defaultUserImage}
                      alt={post.author ?? "Author"}
                      width={100}
                      height={100}
                      className="h-full w-full rounded-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <span className="font-sans text-[1.125rem] leading-[150%] font-semibold tracking-[-0.03em] text-white xl:text-[1.25rem]">
                      {post.author ?? "Author"}
                    </span>
                    <span className="text-grey-60 font-sans text-base leading-[150%] font-normal tracking-[-0.03em] xl:text-[1.125rem]">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center md:hidden">
                  <LinkButton variant="regular" href={`/posts/${post.slug}`} />
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-5 md:justify-center">
                <span className="text-grey-60 text-base leading-[150%] font-semibold tracking-[-0.03em] xl:text-[1.25rem]">
                  {formatDate(post.publicationDate)}
                </span>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[1.125rem] leading-[150%] font-semibold tracking-[-0.03em] text-white xl:text-[1.625rem]">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-grey-60 text-sm leading-[150%] font-normal tracking-[-0.03em] xl:text-[1.125rem]">
                      {post.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <SocialStatButton
                    icon={
                      <LikeIcon
                        filled={post.isLiked}
                        className="h-5 w-5 xl:h-6 xl:w-6"
                      />
                    }
                    value={formatNumber(post.likes)}
                    transparent={!post.isLiked}
                    onClick={() => handleLike(post.id)}
                  />
                  <SocialStatButton
                    icon={<CommentIcon className="h-5 w-5 xl:h-6 xl:w-6" />}
                    value={post.comments?.toString() ?? "0"}
                  />
                  <SharePopover
                    url={getPostUrl(post.slug)}
                    title={post.title}
                    shareCount={post.shares}
                  />
                </div>
              </div>

              <div className="hidden items-center justify-end md:flex md:justify-self-end">
                <LinkButton variant="regular" href={`/posts/${post.slug}`} />
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </section>
  );
}
