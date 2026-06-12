# Home Likes: Before vs After

## Goal

Keep likes working with signed cookies and make the home route (`/`) static in production build.

## Before

### What the code did

- `src/services/homeData.ts` called `cookies()` from `next/headers` during server render.
- The service computed `isLiked` on the server for each article and returned personalized article data.
- `HomeFeaturedAndListSection` and `HomeCategoryPreviewSection` depended on that service.

### Why this made `/` dynamic

`cookies()` is a Dynamic API in App Router.  
When a route reads request cookies at render time, the HTML can differ per user. Because of that, Next.js cannot prerender one shared static HTML for `/`.

Result in build output before:

- `ƒ /` (dynamic)

## After

### What changed

1. Removed cookie reads from home server data path
   - `src/services/homeData.ts` now returns `getArticles()` directly.
   - `src/components/home/HomeFeaturedAndListSection.tsx` now uses `getArticles()`.
   - `src/components/home/HomeCategoryPreviewSection.tsx` now uses `getArticles()`.

2. Moved like hydration to client-only code
   - Added `src/utils/likesCookieClient.ts`.
   - `FeaturedArticleSection`, `ArticlesList`, and `ArticlesPreviewByCategorySection` initialize state with cookie-based like flags in client runtime.
   - No `useEffect` was introduced.

3. Kept signed cookie validation in API and made cookie readable by browser JS (option C)
   - `src/app/api/articles/[id]/likes/route.ts` changed cookie option from `httpOnly: true` to `httpOnly: false`.
   - Signature validation in `src/utils/likesCookie.ts` remains the server authority for accepted likes/unlikes.

### Why `/` is static now

The home route no longer calls `cookies()` (or any other Dynamic API) while rendering server components.  
The server generates one cacheable HTML for everyone, and like personalization happens in client code after load.

Result in build output after:

- `○ /` (static)

## Security note

- Making the like cookie non-`httpOnly` allows client JS to read it for UI hydration.
- Cookie forgery is still blocked by server-side HMAC validation.
- The tradeoff is increased exposure under XSS compared to `httpOnly` cookies.

## Validation run

- `bun run build` => `/` is `○` static.
- `bunx tsc --noEmit` => pass.
- `bun run test` => pass (83 tests).
