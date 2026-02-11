"use client";

import { useCallback, useState, useEffect } from "react";
import { Post } from "@/types/post";
import { mockPosts } from "@/data/mocks/posts";
import { getLatestPost, getOtherPosts } from "@/utils/posts";

const SIMULATED_LOADING_DELAY = 1000;

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

export function usePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Post[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([...mockPosts]);
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setData((prev) => (prev ? togglePostLike(prev, postId) : null));
  }, []);

  return { data, isLoading, error: null, toggleLike };
}

export function useFeaturedPost() {
  const { data: posts, isLoading, toggleLike } = usePosts();
  const latestPost = getLatestPost(posts || []) || null;
  return { data: latestPost, isLoading, error: null, toggleLike };
}

export function useRegularPosts() {
  const { data: posts, isLoading, toggleLike } = usePosts();
  const otherPosts = getOtherPosts(posts || []);
  return { data: otherPosts, isLoading, error: null, toggleLike };
}
