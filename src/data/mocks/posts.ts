import { Post } from "@/types/post";
import Todays_Mock_1 from "../../../public/mocks/Todays_mock_1.png";
import Todays_Mock_2 from "../../../public/mocks/Todays_mock_2.png";
import Todays_Mock_3 from "../../../public/mocks/Todays_mock_3.png";
import Todays_Mock_4 from "../../../public/mocks/Todays_mock_4.png";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Global Climate Summit Addresses Urgent Climate Action",
    description:
      "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions.",
    image: Todays_Mock_1,
    imageAlt: "news-1",
    category: "Environment",
    publicationDate: "2024-01-15",
    author: "Jane Smith",
    likes: 14000,
    shares: 204,
  },
  {
    id: "2",
    title: "A Decisive Victory for Progressive Policies",
    image: Todays_Mock_2,
    imageAlt: "news-2",
    category: "Politics",
    publicationDate: "2024-01-14",
    likes: 14000,
    shares: 204,
  },
  {
    id: "3",
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    image: Todays_Mock_3,
    imageAlt: "news-3",
    category: "Technology",
    publicationDate: "2024-01-13",
    likes: 14000,
    shares: 204,
  },
  {
    id: "4",
    title: "COVID-19 Variants",
    image: Todays_Mock_4,
    imageAlt: "news-4",
    category: "Health",
    publicationDate: "2024-01-12",
    likes: 14000,
    shares: 204,
  },
];
