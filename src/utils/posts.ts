import { Post } from "@/types/post";

const parseDate = (dateString?: string): Date => {
  if (!dateString) return new Date(0);
  return new Date(dateString);
};

const sortPostsByDate = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    const dateA = parseDate(a.publicationDate);
    const dateB = parseDate(b.publicationDate);
    return dateB.getTime() - dateA.getTime();
  });
};

export const getLatestPost = (posts: Post[]): Post | undefined => {
  const sortedPosts = sortPostsByDate(posts);
  return sortedPosts[0];
};

export const getOtherPosts = (posts: Post[]): Post[] => {
  const sortedPosts = sortPostsByDate(posts);
  return sortedPosts.slice(1);
};
