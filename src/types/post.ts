import { StaticImageData } from "next/image";

export interface Post {
  id: string;
  title: string;
  description?: string;
  image: StaticImageData;
  imageAlt: string;
  category: string;
  publicationDate?: string;
  author?: string;
  authorImage?: StaticImageData;
  likes: number;
  comments?: number;
  shares: number;
  isLiked?: boolean;
  isFeatured?: boolean;
}
