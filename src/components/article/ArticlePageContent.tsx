"use client";

import { useMemo, useState } from "react";
import { mockArticles } from "@/data/mocks/articles";
import { Separator } from "@/components/common/Separator";
import { ArticleHero } from "./ArticleHero";
import { ArticleSocialStats } from "./ArticleSocialStats";
import { ArticleBody } from "./ArticleBody";
import { ArticleSidebar } from "./ArticleSidebar";
import { ArticleSimilarNews } from "./ArticleSimilarNews";
import type { ArticlePageContentProps, ArticleSection } from "@/types/article";

const articleSections: ArticleSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.",
  },
  {
    id: "ai-overview",
    title: "Artificial Intelligence (AI)",
    content:
      "Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics and Disease Prevention",
    content:
      "One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection.",
  },
  {
    id: "personalized-plans",
    title: "Personalized Treatment Plans",
    content:
      "AI models can process patient-specific data and support clinicians with treatment recommendations that align with patient history, risk factors, and expected outcomes. This allows care teams to make faster, evidence-based decisions.",
  },
  {
    id: "drug-discovery",
    title: "Drug Discovery and Research",
    content:
      "In pharmaceutical research, AI accelerates molecule screening and predicts candidate behavior in significantly less time. It helps reduce costs and shortens discovery cycles for high-impact therapies.",
  },
  {
    id: "telemedicine",
    title: "AI in Telemedicine",
    content:
      "Virtual care platforms are increasingly embedding AI-assisted triage, symptom analysis, and patient routing, improving response time and quality of care in remote environments.",
  },
  {
    id: "ethical-considerations",
    title: "Ethical Considerations",
    content:
      "As AI adoption grows, healthcare organizations must ensure fairness, transparency, and privacy. Governance models, human oversight, and compliance standards are essential to maintain trust.",
  },
  {
    id: "future-healthcare",
    title: "The Future of AI in Healthcare",
    content:
      "The next decade will likely bring deeper integration between AI and clinical systems. From precision medicine to autonomous workflows, the opportunity is broad and demands careful implementation.",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    content:
      "AI in healthcare is not a distant possibility. It is already delivering measurable value in patient outcomes and operational efficiency. The challenge now is scaling responsibly and ethically.",
  },
];

const ARTICLE_STATS = { likes: "24.5k", views: "50k", shares: "206" };

const ARTICLE_METADATA = {
  publicationDate: "October 15, 2023",
  category: "Healthcare",
  readingTime: "10 Min",
  authorName: "Dr. Emily Walker",
};

export function ArticlePageContent({ articleId }: ArticlePageContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const article =
    mockArticles.find((item) => item.id === articleId) ?? mockArticles[0];

  const similarArticles = useMemo(
    () =>
      mockArticles
        .filter((item) => item.id !== article.id)
        .sort((current, next) => {
          if (
            current.category === article.category &&
            next.category !== article.category
          )
            return -1;
          if (
            current.category !== article.category &&
            next.category === article.category
          )
            return 1;
          return 0;
        })
        .slice(0, 3),
    [article.category, article.id]
  );

  const tocHeadings = articleSections.map(({ id, title }) => ({ id, title }));

  return (
    <article className="flex w-full flex-col">
      <ArticleHero
        image={article.image}
        imageAlt={article.imageAlt}
        title="The Rise of Artificial Intelligence in Healthcare"
      />

      <div className="flex w-full flex-col">
        {/* Mobile stats */}
        <Separator className="lg:hidden" />
        <ArticleSocialStats
          stats={ARTICLE_STATS}
          className="flex justify-center gap-[0.875rem] px-[3.375rem] py-5 md:px-6 lg:hidden"
          aria-label="Article social stats"
        />
        <Separator className="lg:hidden" />

        {/* Two-column grid */}
        <section className="border-dark-15 grid overflow-x-clip border-t pt-10 pr-6 pb-10 pl-6 md:px-10 lg:grid-cols-[minmax(0,2.2636fr)_minmax(0,1fr)] lg:border-b lg:pt-0 lg:pr-0 lg:pb-20 lg:pl-20">
          <ArticleBody
            sections={articleSections}
            isExpanded={isExpanded}
            onExpand={() => setIsExpanded(true)}
          />
          <ArticleSidebar
            stats={ARTICLE_STATS}
            metadata={ARTICLE_METADATA}
            headings={tocHeadings}
          />
        </section>

        <Separator />

        <ArticleSimilarNews articles={similarArticles} />
      </div>
    </article>
  );
}
