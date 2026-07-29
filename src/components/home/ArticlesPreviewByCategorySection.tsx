"use client";

import { useState } from "react";
import { CategoryFilterCarouselMobile } from "./CategoryFilterCarouselMobile";
import { CategoryFilterButtonsRow } from "./CategoryFilterButtonsRow";
import { Separator } from "../common/Separator";
import Image from "next/image";
import defaultUserImage from "../../../public/mocks/imageUser.png";
import { LinkButton } from "../blog/LinkButton";
import { SocialStatButton } from "../blog/SocialStatButton";
import { SharePopover } from "../blog/SharePopover";
import { CommentIcon, LikeIcon } from "../common/icons";
import { formatDate, formatNumber } from "@/utils/formatter";
import type { Article } from "@/types/article";
import type { ArticleCategoryFilterOption } from "@/services/types";
import { toast } from "sonner";
import { useArticleLikes } from "@/hooks/useArticleLikes";

interface ArticlesPreviewByCategorySectionProps {
  articles: Article[];
  categoryFilterOptions: ArticleCategoryFilterOption[];
}

export function ArticlesPreviewByCategorySection({
  articles: initialArticles,
  categoryFilterOptions,
}: ArticlesPreviewByCategorySectionProps) {
  const { articles, toggleArticleLike } = useArticleLikes(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleLike = async (articleId: string) => {
    const article = articles.find((item) => item.id === articleId);
    if (!article) return;

    try {
      await toggleArticleLike(article);
    } catch {
      toast.error("Nao foi possivel atualizar o like.");
    }
  };

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <section className="bg-dark-10 -mx-4 px-4 md:-mx-5 lg:-mx-20 lg:px-20 2xl:-mx-40 2xl:px-40">
      <div className="py-5 lg:py-10 2xl:py-[3.125rem]">
        <div className="flex flex-col gap-6">
          <CategoryFilterCarouselMobile
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            categoryFilterOptions={categoryFilterOptions}
          />
          <CategoryFilterButtonsRow
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            categoryFilterOptions={categoryFilterOptions}
          />
        </div>
      </div>
      <Separator />

      <div className="flex flex-col gap-6 py-10">
        {filteredArticles.map((article) => (
          <div key={article.id} className="flex flex-col gap-6">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[384fr_942fr_220fr] md:items-stretch md:gap-4">
              <div className="flex w-full justify-between md:contents">
                <div className="flex shrink-0 items-start gap-4">
                  <div className="bg-dark-20 h-[3.75rem] w-[3.75rem] shrink-0 rounded-full xl:h-20 xl:w-20">
                    <Image
                      src={article.authorImage ?? defaultUserImage}
                      alt={article.author ?? "Author"}
                      width={100}
                      height={100}
                      className="h-full w-full rounded-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <span className="font-sans text-[1.125rem] leading-[150%] font-semibold tracking-[-0.03em] text-white xl:text-[1.25rem]">
                      {article.author ?? "Author"}
                    </span>
                    <span className="text-grey-60 font-sans text-base leading-[150%] font-normal tracking-[-0.03em] xl:text-[1.125rem]">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center md:hidden">
                  <LinkButton
                    variant="regular"
                    href={`/article/${article.slug}`}
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-5 md:justify-center">
                <span className="text-grey-60 text-base leading-[150%] font-semibold tracking-[-0.03em] xl:text-[1.25rem]">
                  {formatDate(article.publicationDate)}
                </span>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[1.125rem] leading-[150%] font-semibold tracking-[-0.03em] text-white xl:text-[1.625rem]">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-grey-60 text-sm leading-[150%] font-normal tracking-[-0.03em] xl:text-[1.125rem]">
                      {article.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <SocialStatButton
                    icon={
                      <LikeIcon
                        filled={article.isLiked}
                        className="h-5 w-5 xl:h-6 xl:w-6"
                      />
                    }
                    value={formatNumber(article.likes)}
                    transparent={!article.isLiked}
                    onClick={() => handleLike(article.id)}
                  />
                  <SocialStatButton
                    icon={<CommentIcon className="h-5 w-5 xl:h-6 xl:w-6" />}
                    value={article.comments?.toString() ?? "0"}
                  />
                  <SharePopover article={article} />
                </div>
              </div>

              <div className="hidden items-center justify-end md:flex md:justify-self-end">
                <LinkButton
                  variant="regular"
                  href={`/article/${article.slug}`}
                />
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </section>
  );
}
