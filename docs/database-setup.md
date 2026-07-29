# Database setup (SQLite / Turso)

This project uses Payload CMS with the SQLite adapter (`@payloadcms/db-sqlite`). The database target is controlled by `DATABASE_URL`.

## Local development

```bash
# 1. Copy env template
cp .env.example .env.local

# 2. Create schema + seed demo content
npm run db:setup
```

By default, `.env.local` can omit `DATABASE_URL` to use `file:./payload.db`, or set it explicitly:

```env
DATABASE_URL=file:./payload.db
MEDIA_STORAGE=local
PAYLOAD_SECRET=your-dev-secret
```

## Turso (dev / prod)

1. Create a database in the Turso dashboard (or CLI).
2. Copy the database URL and create an auth token.
3. Add to `.env.local` (dev) or Vercel env vars (preview/prod):

```env
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-token
```

4. If a previous migration failed, **destroy and recreate** the Turso database before running migrations again.
5. Apply schema:

```bash
npm run migrate
```

6. Seed demo content (dev/preview only):

```bash
npm run seed
# or recreate everything:
npm run seed -- --force
```

## Commands

Scripts load `.env` and `.env.local` automatically (same as Next.js).

| Command                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run migrate`         | Apply pending Payload migrations                    |
| `npm run migrate:create`  | Generate a new migration from schema diff           |
| `npm run seed`            | Idempotent seed (skips if published articles exist) |
| `npm run seed -- --force` | Clear seed collections and recreate data            |
| `npm run db:setup`        | `migrate` + `seed`                                  |

## Seed contents

After seeding you can test:

- **Visitor:** `/`, `/article/ai-in-healthcare`
- **Admin:** `/admin` with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`

Seeded data includes:

- 1 admin user
- 4 categories (Technology, Health, Environment, Politics)
- 5 published articles + 1 draft
- 1 featured article with full body, TOC headings, image block, and related posts
- Media uploads from `public/mocks/`

## Production safety

- Run `npm run migrate` on each new environment once.
- Avoid demo seed in production. If needed:

```bash
ALLOW_PROD_SEED=true npm run seed -- --force
```

## Troubleshooting

### `no such table: articles`

The database is empty and incremental migrations were applied before a baseline existed. Recreate the Turso database and run `npm run migrate` with the current baseline migration.

### Seed media upload fails

Use `MEDIA_STORAGE=local` for local/Turso dev seeding. R2 requires valid `R2_*` variables.
