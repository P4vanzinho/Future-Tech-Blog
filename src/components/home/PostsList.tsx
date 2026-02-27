"use client";

import { Separator } from "@/components/common/Separator";
import { Post } from "@/components/blog/Post";
import { PostSkeleton } from "@/components/blog/PostSkeleton";
import { useRegularPosts } from "@/hooks/usePosts";

export function FeaturedPostsListSection() {
  const { data: regularPosts, isLoading, toggleLike } = useRegularPosts();

  if (isLoading) {
    return (
      <>
        <PostSkeleton />
        <Separator />
        <PostSkeleton />
        <Separator />
      </>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8">
      {regularPosts?.map((post, index) => (
        <div key={post.id} className="min-w-0 flex-1">
          <Post post={post} onLike={toggleLike} />
          {index < regularPosts.length - 1 && (
            <Separator className="lg:hidden" />
          )}
        </div>
      ))}
    </section>
  );
}
