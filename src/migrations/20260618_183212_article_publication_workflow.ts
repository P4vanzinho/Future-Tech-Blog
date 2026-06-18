import { sql } from "@payloadcms/db-sqlite";
import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`articles\` ADD \`published_at\` text;`);
  await db.run(
    sql`ALTER TABLE \`articles\` ADD \`_status\` text DEFAULT 'draft';`
  );
  await db.run(sql`
    UPDATE \`articles\`
    SET \`slug\` = trim(\`slug\`),
        \`published_at\` = \`created_at\`,
        \`_status\` = 'published'
    WHERE \`_status\` IS NULL OR \`_status\` = 'draft';
  `);
  await db.run(
    sql`CREATE INDEX \`articles__status_idx\` ON \`articles\` (\`_status\`);`
  );

  await db.run(sql`CREATE TABLE \`_articles_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_title\` text,
    \`version_slug\` text,
    \`version_is_featured\` integer DEFAULT false,
    \`version_author_id\` integer,
    \`version_category_id\` integer,
    \`version_cover_image_id\` integer,
    \`version_excerpt\` text,
    \`version_published_at\` text,
    \`version_stats_likes\` numeric DEFAULT 0,
    \`version_stats_views\` numeric DEFAULT 0,
    \`version_stats_shares\` numeric DEFAULT 0,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );`);
  await db.run(
    sql`CREATE INDEX \`_articles_v_parent_idx\` ON \`_articles_v\` (\`parent_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version_slug_idx\` ON \`_articles_v\` (\`version_slug\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version_author_idx\` ON \`_articles_v\` (\`version_author_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version_category_idx\` ON \`_articles_v\` (\`version_category_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version_cover_image_idx\` ON \`_articles_v\` (\`version_cover_image_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version_updated_at_idx\` ON \`_articles_v\` (\`version_updated_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version_created_at_idx\` ON \`_articles_v\` (\`version_created_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_version__status_idx\` ON \`_articles_v\` (\`version__status\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_created_at_idx\` ON \`_articles_v\` (\`created_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_updated_at_idx\` ON \`_articles_v\` (\`updated_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_latest_idx\` ON \`_articles_v\` (\`latest\`);`
  );

  await db.run(sql`CREATE TABLE \`_articles_v_blocks_rich_text_block\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`_path\` text NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`content\` text,
    \`_uuid\` text,
    \`block_name\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_rich_text_block_order_idx\` ON \`_articles_v_blocks_rich_text_block\` (\`_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_rich_text_block_parent_id_idx\` ON \`_articles_v_blocks_rich_text_block\` (\`_parent_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_rich_text_block_path_idx\` ON \`_articles_v_blocks_rich_text_block\` (\`_path\`);`
  );

  await db.run(sql`CREATE TABLE \`_articles_v_blocks_image_block\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`_path\` text NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`image_id\` integer,
    \`caption\` text,
    \`_uuid\` text,
    \`block_name\` text,
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_image_block_order_idx\` ON \`_articles_v_blocks_image_block\` (\`_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_image_block_parent_id_idx\` ON \`_articles_v_blocks_image_block\` (\`_parent_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_image_block_path_idx\` ON \`_articles_v_blocks_image_block\` (\`_path\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_blocks_image_block_image_idx\` ON \`_articles_v_blocks_image_block\` (\`image_id\`);`
  );

  await db.run(sql`CREATE TABLE \`_articles_v_version_tags\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_tags_order_idx\` ON \`_articles_v_version_tags\` (\`_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_version_tags_parent_id_idx\` ON \`_articles_v_version_tags\` (\`_parent_id\`);`
  );

  await db.run(sql`CREATE TABLE \`_articles_v_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`articles_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(
    sql`CREATE INDEX \`_articles_v_rels_order_idx\` ON \`_articles_v_rels\` (\`order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_rels_parent_idx\` ON \`_articles_v_rels\` (\`parent_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_rels_path_idx\` ON \`_articles_v_rels\` (\`path\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_articles_v_rels_articles_id_idx\` ON \`_articles_v_rels\` (\`articles_id\`);`
  );
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_articles_v_blocks_rich_text_block\`;`);
  await db.run(sql`DROP TABLE \`_articles_v_blocks_image_block\`;`);
  await db.run(sql`DROP TABLE \`_articles_v_version_tags\`;`);
  await db.run(sql`DROP TABLE \`_articles_v_rels\`;`);
  await db.run(sql`DROP TABLE \`_articles_v\`;`);
  await db.run(sql`DROP INDEX \`articles__status_idx\`;`);
  await db.run(sql`ALTER TABLE \`articles\` DROP COLUMN \`_status\`;`);
  await db.run(sql`ALTER TABLE \`articles\` DROP COLUMN \`published_at\`;`);
}
