import { getPayload } from "payload";
import config from "@payload-config";
import type { Category } from "../../payload-types";
import type { ArticleCategoryFilterOption } from "@/services/types";

function mapCategoryToFilterOption(
  category: Pick<Category, "slug" | "title">
): ArticleCategoryFilterOption {
  return {
    id: category.slug,
    label: category.title,
  };
}

export async function getArticleCategoryFilterOptions(
  limit = 50
): Promise<ArticleCategoryFilterOption[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "categories",
    sort: "title",
    limit,
    select: {
      title: true,
      slug: true,
    },
  });

  return result.docs.map(mapCategoryToFilterOption);
}
