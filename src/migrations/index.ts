import * as migration_20260618_183212_article_publication_workflow from "./20260618_183212_article_publication_workflow";
import * as migration_20260618_191500_amanda_post_body from "./20260618_191500_amanda_post_body";

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
];
