import * as migration_20260618_183212_article_publication_workflow from "./20260618_183212_article_publication_workflow";
import * as migration_20260618_191500_amanda_post_body from "./20260618_191500_amanda_post_body";
import * as migration_20260728_170729_media_storage_prefix from "./20260728_170729_media_storage_prefix";

export const migrations = [
  {
    up: migration_20260618_183212_article_publication_workflow.up,
    down: migration_20260618_183212_article_publication_workflow.down,
    name: "20260618_183212_article_publication_workflow",
  },
  {
    up: migration_20260618_191500_amanda_post_body.up,
    down: migration_20260618_191500_amanda_post_body.down,
    name: "20260618_191500_amanda_post_body",
  },
  {
    up: migration_20260728_170729_media_storage_prefix.up,
    down: migration_20260728_170729_media_storage_prefix.down,
    name: "20260728_170729_media_storage_prefix",
  },
];
