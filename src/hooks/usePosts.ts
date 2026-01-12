"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { mockPosts } from "@/data/mocks/posts";
import { getLatestPost, getOtherPosts } from "@/utils/posts";

const SIMULATED_LOADING_DELAY = 1000;

export function usePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Post[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockPosts);
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error: null };
}

export function useFeaturedPost() {
  const { data: posts, isLoading } = usePosts();
  const latestPost = getLatestPost(posts || []) || null;
  return { data: latestPost, isLoading, error: null };
}

export function useRegularPosts() {
  const { data: posts, isLoading } = usePosts();
  const otherPosts = getOtherPosts(posts || []);
  return { data: otherPosts, isLoading, error: null };
}
