import { Post } from "@/types/post";
import Todays_Mock_1 from "../../../public/mocks/Todays_mock_1.png";
import Todays_Mock_2 from "../../../public/mocks/Todays_mock_2.png";
import Todays_Mock_3 from "../../../public/mocks/Todays_mock_3.png";
import Todays_Mock_4 from "../../../public/mocks/Todays_mock_4.png";
import imageUser from "../../../public/mocks/imageUser.png";

export const mockPosts: Post[] = [
  {
    id: "1",
    slug: "global-climate-summit-addresses-urgent-climate-action",
    title: "Global Climate Summit Addresses Urgent Climate Action",
    description:
      "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions.",
    image: Todays_Mock_1,
    imageAlt: "news-1",
    category: "Environment",
    publicationDate: "2024-01-15",
    author: "Jane Smith",
    authorImage: imageUser,
    likes: 24500,
    comments: 50,
    shares: 204,
    isLiked: true,
  },
  {
    id: "2",
    slug: "a-decisive-victory-for-progressive-policies",
    title: "A Decisive Victory for Progressive Policies",
    image: Todays_Mock_2,
    imageAlt: "news-2",
    category: "Politics",
    publicationDate: "2024-01-14",
    author: "John Techson",
    authorImage: imageUser,
    likes: 14000,
    comments: 32,
    shares: 204,
  },
  {
    id: "3",
    slug: "tech-giants-unveil-cutting-edge-ai-innovations",
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    description:
      "Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape",
    image: Todays_Mock_3,
    imageAlt: "news-3",
    category: "Technology",
    publicationDate: "2024-01-13",
    author: "John Techson",
    authorImage: imageUser,
    likes: 14000,
    comments: 50,
    shares: 204,
    isLiked: true,
  },
  {
    id: "4",
    slug: "covid-19-variants",
    title: "COVID-19 Variants",
    image: Todays_Mock_4,
    imageAlt: "news-4",
    category: "Health",
    publicationDate: "2024-01-12",
    author: "Jane Smith",
    authorImage: imageUser,
    likes: 14000,
    comments: 28,
    shares: 204,
  },
];

/** Posts for the "articles by category" list (same data as mockPosts, named for section use). */
export const regularPosts: Post[] = mockPosts;
