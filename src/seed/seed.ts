import { getPayload } from "payload";
import config from "@payload-config";
import { clearSeedData } from "./clear";
import { seedAuthors } from "./data/authors";
import { seedArticles, getArticleBodyBlocks } from "./data/articles";
import { seedCategories } from "./data/categories";
import { readSeedImage } from "./utils/files";

type SeedContext = {
  force: boolean;
};

function getSeedAdminCredentials() {
  return {
    email: process.env.SEED_ADMIN_EMAIL?.trim() || "admin@futuretech.local",
    password: process.env.SEED_ADMIN_PASSWORD?.trim() || "Admin123!",
  };
}

function assertSeedAllowed(force: boolean) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!force) {
    throw new Error(
      "Refusing to seed production without --force. Use ALLOW_PROD_SEED=true with --force if intentional."
    );
  }

  if (process.env.ALLOW_PROD_SEED !== "true") {
    throw new Error(
      "Production seed blocked. Set ALLOW_PROD_SEED=true to continue."
    );
  }
}

async function seedAdminUser(payload: Awaited<ReturnType<typeof getPayload>>) {
  const { email, password } = getSeedAdminCredentials();

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    return existing.docs[0];
  }

  return payload.create({
    collection: "users",
    data: { email, password },
    overrideAccess: true,
    context: { skipRevalidation: true },
  });
}

async function seedCategoriesData(
  payload: Awaited<ReturnType<typeof getPayload>>
) {
  const categoryIds = new Map<string, number>();

  for (const category of seedCategories) {
    const created = await payload.create({
      collection: "categories",
      data: category,
      overrideAccess: true,
      context: { skipRevalidation: true },
    });
    categoryIds.set(category.slug, created.id);
  }

  return categoryIds;
}

async function seedMediaAssets(
  payload: Awaited<ReturnType<typeof getPayload>>
) {
  const mediaIds = new Map<string, number>();
  const files = [
    { key: "Todays_mock_1.png", alt: "Technology cover image" },
    { key: "Todays_mock_2.png", alt: "Environment cover image" },
    { key: "Todays_mock_3.png", alt: "Politics cover image" },
    { key: "Todays_mock_4.png", alt: "Health cover image" },
    { key: "imageUser.png", alt: "Author avatar" },
  ] as const;

  for (const file of files) {
    const upload = await readSeedImage(file.key);
    const created = await payload.create({
      collection: "media",
      data: { alt: file.alt },
      file: upload,
      overrideAccess: true,
      context: { skipRevalidation: true },
    });
    mediaIds.set(file.key, created.id);
  }

  return mediaIds;
}

async function seedAuthorsData(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaIds: Map<string, number>
) {
  const authorIds = new Map<string, number>();

  for (const author of seedAuthors) {
    const avatarId = mediaIds.get(author.avatarFile);
    const created = await payload.create({
      collection: "authors",
      data: {
        name: author.name,
        role: author.role,
        ...(avatarId ? { avatar: avatarId } : {}),
      },
      overrideAccess: true,
      context: { skipRevalidation: true },
    });
    authorIds.set(author.key, created.id);
  }

  return authorIds;
}

async function seedArticlesData(
  payload: Awaited<ReturnType<typeof getPayload>>,
  {
    categoryIds,
    authorIds,
    mediaIds,
  }: {
    categoryIds: Map<string, number>;
    authorIds: Map<string, number>;
    mediaIds: Map<string, number>;
  }
) {
  const articleIds = new Map<string, number>();
  const publishedArticles = seedArticles.filter(
    (article) => article.status === "published"
  );

  for (const article of publishedArticles) {
    const categoryId = categoryIds.get(article.categorySlug);
    const authorId = authorIds.get(article.authorKey);
    const coverImageId = mediaIds.get(article.coverFile);

    if (!categoryId || !authorId || !coverImageId) {
      throw new Error(`Missing relations for article seed: ${article.slug}`);
    }

    const imageBlockMediaId = article.includeImageBlock
      ? mediaIds.get("Todays_mock_3.png")
      : undefined;

    const created = await payload.create({
      collection: "articles",
      draft: false,
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        isFeatured: article.isFeatured ?? false,
        author: authorId,
        category: categoryId,
        coverImage: coverImageId,
        publishedAt: article.publishedAt,
        _status: "published",
        stats: article.stats ?? { likes: 0, views: 0, shares: 0 },
        ...(article.tags
          ? { tags: article.tags.map((name) => ({ name })) }
          : {}),
        ...(article.includeFullBody
          ? { body: getArticleBodyBlocks(imageBlockMediaId) }
          : {}),
      },
      overrideAccess: true,
      context: { skipRevalidation: true },
    });

    articleIds.set(article.slug, created.id);
  }

  for (const article of publishedArticles) {
    if (!article.relatedSlugs?.length) {
      continue;
    }

    const articleId = articleIds.get(article.slug);
    if (!articleId) {
      continue;
    }

    const relatedPosts = article.relatedSlugs
      .map((slug) => articleIds.get(slug))
      .filter((id): id is number => typeof id === "number");

    if (relatedPosts.length === 0) {
      continue;
    }

    await payload.update({
      collection: "articles",
      id: articleId,
      data: { relatedPosts },
      overrideAccess: true,
      context: { skipRevalidation: true },
    });
  }

  for (const article of seedArticles.filter(
    (entry) => entry.status === "draft"
  )) {
    const categoryId = categoryIds.get(article.categorySlug);
    const authorId = authorIds.get(article.authorKey);
    const coverImageId = mediaIds.get(article.coverFile);

    if (!categoryId || !authorId || !coverImageId) {
      throw new Error(`Missing relations for draft seed: ${article.slug}`);
    }

    await payload.create({
      collection: "articles",
      draft: true,
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        isFeatured: false,
        author: authorId,
        category: categoryId,
        coverImage: coverImageId,
        _status: "draft",
      },
      overrideAccess: true,
      context: { skipRevalidation: true },
    });
  }
}

export async function runSeed({ force }: SeedContext) {
  assertSeedAllowed(force);

  const payload = await getPayload({ config });

  if (force) {
    console.info("Clearing existing seed data...");
    await clearSeedData(payload);
  } else {
    const existingPublished = await payload.find({
      collection: "articles",
      where: { _status: { equals: "published" } },
      limit: 1,
      overrideAccess: true,
    });

    if (existingPublished.docs.length > 0) {
      console.info("Seed skipped: published articles already exist.");
      return;
    }
  }

  console.info("Creating admin user...");
  const adminUser = await seedAdminUser(payload);

  console.info("Creating categories...");
  const categoryIds = await seedCategoriesData(payload);

  console.info("Uploading media...");
  const mediaIds = await seedMediaAssets(payload);

  console.info("Creating authors...");
  const authorIds = await seedAuthorsData(payload, mediaIds);

  console.info("Creating articles...");
  await seedArticlesData(payload, { categoryIds, authorIds, mediaIds });

  const { email } = getSeedAdminCredentials();
  console.info("Seed completed successfully.");
  console.info(`Admin login: ${email}`);
  console.info(`Admin user id: ${adminUser.id}`);
  console.info("Visitor routes: / and /article/ai-in-healthcare");
}
