# Feature: Payload CMS Integration & Content Modeling

## Overview

This feature implements the core content management infrastructure for the Future Tech Blog using Payload CMS 3.0. It transitions the project from static mock data toward a dynamic, schema-driven architecture while maintaining a clean separation between the CMS and the frontend application.

## Key Changes

### 1. Infrastructure & Setup

- **Payload CMS 3.0 Integration**: Installed and configured Payload as a native Next.js application.
- **Database Layer**: Implemented **SQLite** with **Drizzle ORM** for local data persistence.
- **Image Processing**: Integrated **Sharp** for high-performance image optimization and thumbnail generation.
- **Route Isolation**: Moved frontend files to a `(blog)` route group and CMS files to a `(payload)` route group to prevent Root Layout nesting and Hydration errors.
- **Environment Configuration**: Added `PAYLOAD_SECRET` for secure authentication and configured `withPayload` in `next.config.ts`.

### 2. Content Modeling (Collections)

Defined four primary collections in `src/collections/` to support the blog's requirements:

- **Media**: Handles all file uploads with automatic optimization.
- **Authors**: Manages creator profiles (Name, Role, Avatar).
- **Categories**: Organizes content for filtering and SEO (Title, Slug).
- **Articles**: The core content model featuring:
  - **Tabbed UI**: Organized into Cover Info, Dynamic Content, and Metrics.
  - **System of Blocks**: Flexible layout using `richTextBlock` (Lexical) and `imageBlock`.
  - **Relational Data**: Links to Authors, Categories, and Related Posts.
  - **Engagement Stats**: Grouped fields for likes, views, and shares.

### 3. Developer Experience

- **Type Safety**: Configured automatic generation of `payload-types.ts` to provide full TypeScript support across the project.
- **Admin UX**: Enabled `autoLogin` in development mode for faster testing.
- **Path Aliases**: Added `@payload-config` to `tsconfig.json` for cleaner imports.

---

## How to Test

### 1. Prerequisites

Ensure you have the latest dependencies installed:

```bash
bun install
```

### 2. Start the Development Server

```bash
bun dev
```

### 3. Access the Admin Panel

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).
2. Click the **Auto Login** button (pre-filled with `dev@futuretech.com`).
3. Verify that the dashboard displays the four collections: **Media**, **Authors**, **Categories**, and **Articles**.

### 4. Verify Content Creation

1. **Media**: Upload an image and verify it appears in the list with a generated thumbnail.
2. **Authors**: Create a new author and link it to the uploaded media.
3. **Categories**: Create a category (e.g., "Technology") with a unique slug.
4. **Articles**:
   - Create a new article.
   - Fill in the **Cover info** (Title, Slug, Author, Category).
   - Add content in the **Dynamic content** tab using both Text and Image blocks.
   - Save the article and verify there are no validation errors.

### 5. Verify API Endpoints

Open your browser or an API client (like Postman/Insomnia) and check the following:

- `GET http://localhost:3000/api/articles`: Should return a JSON list of your created articles.
- `GET http://localhost:3000/api/media`: Should return the metadata for your uploaded files.
