# Setup Payload CMS Collections for Articles

This document details the architecture, data modeling, and technical decisions for integrating Payload CMS into the Future Tech Blog.

---

## 1. Architecture Overview

The application follows a **Headless CMS** architecture using **Payload CMS 3.0** integrated directly into the **Next.js App Router**.

### Key Architectural Decisions:

- **Next.js Native Integration:** Payload runs within the same Next.js process, sharing the server and reducing deployment complexity.
- **Local API Strategy:** For the frontend, we prioritize Payload's **Local API** (`payload.find`) over REST/GraphQL to avoid network overhead and leverage direct database access.
- **Database:** **SQLite** was chosen for its simplicity and local file-based storage, managed via the **Drizzle ORM** through the Payload adapter.

---

## 2. Technical Stack & Dependencies

The following libraries were selected based on Payload's official recommendations and project requirements:

| Package                        | Purpose          | Justification                                                                                                                         |
| :----------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `payload`                      | Core CMS         | Handles content management, admin UI, and API generation.                                                                             |
| `@payloadcms/next`             | Next.js Adapter  | Enables Payload to run as a Next.js route group (`/app/(payload)`).                                                                   |
| `@payloadcms/db-sqlite`        | Database Adapter | Uses **Drizzle ORM** to manage SQLite. Handles auto-migrations and relational integrity.                                              |
| `@payloadcms/richtext-lexical` | Rich Text Editor | A highly extensible editor that stores content as a **JSON tree**, enabling features like automatic Table of Contents.                |
| `sharp`                        | Image Engine     | High-performance image processing (libvips-based). Required for thumbnails, cropping, and focal point support in `Media` collections. |

---

## 3. Data Modeling (Collections)

The content model is split into four primary collections to ensure **Separation of Concerns** and data reusability.

### 3.1 Media (Uploads)

- **Purpose:** Centralized storage for all images (post covers, author avatars).
- **Key Features:** Automatic thumbnail generation and `alt` text for accessibility.

### 3.2 Authors

- **Purpose:** Identity management for content creators.
- **Fields:** `name`, `role` (e.g., "Technology Specialist"), and `avatar` (relationship to Media).

### 3.3 Categories

- **Purpose:** Content organization and SEO filtering.
- **Fields:** `title` and `slug` (unique identifier for URL routing).

### 3.4 Articles (Core Collection)

The Articles collection uses **Tabs** to organize the editor experience:

- **Tab 1: Cover Info**
  - `title`, `slug` (unique), `isFeatured` (boolean for hero section).
  - Relationships: `author`, `category`, `coverImage` (Media).
  - `excerpt`: Short summary for card previews.
- **Tab 2: Dynamic Content**
  - `layout`: A **Blocks** field allowing editors to stack different content types:
    - `richTextBlock`: Main text using Lexical (JSON format).
    - `imageBlock`: Full-width or inline images with captions.
- **Tab 3: Metrics & Related**
  - `relatedPosts`: Relationship to other articles (for "Similar News" section).
  - `stats`: Grouped fields for `likes`, `views`, and `shares`.
  - `tags`: Array of strings for granular categorization.

---

## 4. Technical Logic & Business Rules

### 4.1 Automatic Table of Contents (ToC)

Since Lexical stores content as a JSON tree, the frontend logic will:

1. Traverse the `content` JSON.
2. Filter nodes where `type === 'heading'`.
3. Generate unique IDs for anchor scrolling.

### 4.2 Blocks vs. Pure Rich Text

We use **Blocks** instead of a single rich text field to give developers control over layout. Images in the Figma design often occupy the full width or have specific styling that is difficult to enforce inside a standard text editor.

### 4.3 Relational Integrity (SQLite)

Although SQLite is a local file, the `@payloadcms/db-sqlite` adapter ensures relational integrity. Fields like `relatedPosts` (which allow multiple selections) automatically create **Join Tables** in the database, following relational best practices.

---

## 5. Security & Environment

- **PAYLOAD_SECRET:** A secure string stored in `.env.local` used to sign JWTs for admin authentication.
- **Access Control:** Collections are configured with `read: () => true` to allow the Next.js frontend to fetch content without authentication, while keeping `create/update/delete` restricted to authenticated admin users.
