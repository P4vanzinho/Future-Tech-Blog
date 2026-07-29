import { createArticleBodyContent } from "../utils/lexical";

export type SeedArticleDefinition = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  authorKey: string;
  coverFile: string;
  coverAlt: string;
  isFeatured?: boolean;
  status: "published" | "draft";
  publishedAt?: string;
  stats?: {
    likes: number;
    views: number;
    shares: number;
  };
  tags?: string[];
  includeFullBody?: boolean;
  includeImageBlock?: boolean;
  relatedSlugs?: string[];
};

const publishedAt = "2026-06-15T10:00:00.000Z";

export const seedArticles: SeedArticleDefinition[] = [
  {
    slug: "ai-in-healthcare",
    title: "The Rise of Artificial Intelligence in Healthcare",
    excerpt:
      "How AI is transforming diagnostics, treatment planning, and patient outcomes across modern healthcare systems.",
    categorySlug: "technology",
    authorKey: "emily",
    coverFile: "Todays_mock_1.png",
    coverAlt: "AI visualization in a hospital setting",
    isFeatured: true,
    status: "published",
    publishedAt,
    stats: { likes: 24500, views: 50000, shares: 206 },
    tags: ["AI", "Healthcare", "Innovation"],
    includeFullBody: true,
    includeImageBlock: true,
    relatedSlugs: ["green-energy-shift", "mental-health-apps"],
  },
  {
    slug: "green-energy-shift",
    title: "The Global Shift Toward Green Energy",
    excerpt:
      "Renewable adoption is accelerating as governments and enterprises invest in cleaner power grids.",
    categorySlug: "environment",
    authorKey: "james",
    coverFile: "Todays_mock_2.png",
    coverAlt: "Wind turbines at sunset",
    status: "published",
    publishedAt: "2026-06-10T10:00:00.000Z",
    stats: { likes: 8200, views: 21000, shares: 94 },
    tags: ["Energy", "Climate"],
  },
  {
    slug: "policy-and-ai",
    title: "Policy Makers Race to Regulate AI",
    excerpt:
      "New legislation aims to balance innovation with safety in the fast-moving AI economy.",
    categorySlug: "politics",
    authorKey: "james",
    coverFile: "Todays_mock_3.png",
    coverAlt: "Government building facade",
    status: "published",
    publishedAt: "2026-06-08T10:00:00.000Z",
    stats: { likes: 5100, views: 14000, shares: 67 },
  },
  {
    slug: "mental-health-apps",
    title: "Mental Health Apps Enter the Mainstream",
    excerpt:
      "Digital therapeutics and coaching platforms are becoming part of everyday wellness routines.",
    categorySlug: "health",
    authorKey: "emily",
    coverFile: "Todays_mock_4.png",
    coverAlt: "Person using a wellness app on a phone",
    status: "published",
    publishedAt: "2026-06-05T10:00:00.000Z",
    stats: { likes: 9300, views: 18000, shares: 112 },
  },
  {
    slug: "quantum-computing-basics",
    title: "Quantum Computing Explained for Builders",
    excerpt:
      "A practical primer on qubits, error correction, and where quantum hardware is heading next.",
    categorySlug: "technology",
    authorKey: "james",
    coverFile: "Todays_mock_1.png",
    coverAlt: "Abstract quantum computing illustration",
    status: "published",
    publishedAt: "2026-06-01T10:00:00.000Z",
    stats: { likes: 4200, views: 12000, shares: 58 },
  },
  {
    slug: "draft-future-post",
    title: "Draft: The Next Decade of Human-AI Collaboration",
    excerpt:
      "Work-in-progress editorial exploring how teams will collaborate with AI copilots.",
    categorySlug: "technology",
    authorKey: "emily",
    coverFile: "Todays_mock_2.png",
    coverAlt: "Team collaborating with AI tools",
    status: "draft",
  },
];

export function getArticleBodyBlocks(imageMediaId?: number): Array<
  | {
      blockType: "richTextBlock";
      content: ReturnType<typeof createArticleBodyContent>;
    }
  | {
      blockType: "imageBlock";
      image: number;
      caption: string;
    }
> {
  const blocks: Array<
    | {
        blockType: "richTextBlock";
        content: ReturnType<typeof createArticleBodyContent>;
      }
    | {
        blockType: "imageBlock";
        image: number;
        caption: string;
      }
  > = [
    {
      blockType: "richTextBlock",
      content: createArticleBodyContent(),
    },
  ];

  if (imageMediaId) {
    blocks.push({
      blockType: "imageBlock",
      image: imageMediaId,
      caption: "AI-assisted diagnostics in clinical practice",
    });
  }

  return blocks;
}
