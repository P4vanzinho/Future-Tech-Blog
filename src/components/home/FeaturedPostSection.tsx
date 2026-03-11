"use client";

import Image from "next/image";
import { Separator } from "@/components/common/Separator";
import { useFeaturedPost } from "@/hooks/usePosts";
import { FeaturedPostSkeleton } from "../blog/FeaturedPostSkeleton";
import { MetadataItem } from "../blog/MetadataItem";
import { formatDate, formatNumber } from "@/utils/formatter";
import { getPostUrl } from "@/utils/posts";
import { SocialStatButton } from "../blog/SocialStatButton";
import { SharePopover } from "../blog/SharePopover";
import { LikeIcon } from "../common/icons/LikeIcon";
import { LinkButton } from "../blog/LinkButton";

export function LastFeaturedPostSection() {
  const { data: post, isLoading, toggleLike } = useFeaturedPost();

  if (isLoading) return <FeaturedPostSkeleton />;
  if (!post) return null;

  return (
    <section>
      <Separator />
      <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-stretch lg:gap-8 lg:py-[3.75rem] 2xl:justify-between 2xl:py-[5rem]">
        <div className="w-full lg:w-[30rem] lg:flex-shrink-0 2xl:w-[34%]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1000}
            height={1000}
            className="h-[13.3125rem] w-full rounded-lg object-cover lg:h-full"
          />
        </div>
        <div className="flex flex-col lg:gap-10 2xl:gap-[3.125rem]">
          <div>
            <div className="flex flex-col gap-[0.875rem] py-[1.875rem] lg:py-0 lg:pt-5 lg:pb-10 2xl:gap-[1.875rem] 2xl:pb-[3.125rem]">
              <h2 className="font-sans text-[1.25rem] leading-[150%] font-semibold text-white lg:text-[1.5rem] 2xl:text-[2.125rem]">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-grey-60 font-sans text-base leading-[150%] lg:text-[1.125rem] 2xl:text-[1.125rem]">
                  {post.description}
                </p>
              )}
            </div>

            <div className="flex gap-5 pb-[1.875rem] md:pb-0 lg:gap-[1.875rem] 2xl:gap-[3.125rem]">
              <MetadataItem label="Category" value={post?.category} />

              <MetadataItem
                label="Publication Date"
                value={formatDate(post?.publicationDate)}
              />

              <MetadataItem label="Author" value={post?.author} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SocialStatButton
                icon={
                  <LikeIcon
                    filled={post.isLiked}
                    className="text-grey-60 h-5 w-5 2xl:h-6 2xl:w-6"
                  />
                }
                value={formatNumber(post.likes)}
                transparent={!post.isLiked}
                onClick={() => post && toggleLike(post.id)}
              />
              <SharePopover
                url={getPostUrl(post.slug)}
                title={post.title}
                shareCount={post.shares}
              />
            </div>
            <LinkButton
              className="2xl:px-[1.5rem] 2xl:py-[1.125rem]"
              href={`/posts/${post.slug}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
