# Article Page Static Structure

## Business Rules

- The article route must be available at `/article/[id]`.
- The page must render a static skeleton before CMS integration.
- The page must include article hero, social stats, metadata, table of contents, article body, similar news, header, and footer.
- Similar news must follow the same visual style as regular home posts.

## Technical Decisions

- `ArticlePageContent` is mobile-first and receives `articleId` from route params.
- Mock data is used from `mockPosts` as placeholder source.
- Smooth anchor navigation uses `scrollIntoView({ behavior: "smooth" })` and `scroll-behavior: smooth` in global styles.
- Similar news excludes the current article and prioritizes same-category posts.

## Architecture Notes

- Route: `src/app/(blog)/article/[id]/page.tsx`
- Presentation: `src/components/article/ArticlePageContent.tsx`
- TOC behavior: `src/components/article/ArticleTableOfContents.tsx`
- Shared layout elements: `Header` and `Footer` in `src/app/(blog)/layout.tsx`
