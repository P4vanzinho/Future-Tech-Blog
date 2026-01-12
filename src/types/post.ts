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
  likes: number;
  shares: number;
  isFeatured?: boolean;
}
