import { sql } from "@payloadcms/db-sqlite";
import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-sqlite";

const amandaPostBody = JSON.stringify({
  root: {
    type: "root",
    version: 1,
    direction: null,
    format: "",
    indent: 0,
    children: [
      {
        type: "heading",
        tag: "h2",
        version: 1,
        direction: null,
        format: "",
        indent: 0,
        children: [
          {
            type: "text",
            text: "Contexto do artigo",
            version: 1,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
          },
        ],
      },
      {
        type: "paragraph",
        version: 1,
        direction: null,
        format: "",
        indent: 0,
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            text: "Este post da Amanda foi escrito para apresentar a ideia central, o objetivo da publicação e a linha editorial que sustenta o artigo.",
            version: 1,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
          },
        ],
      },
      {
        type: "paragraph",
        version: 1,
        direction: null,
        format: "",
        indent: 0,
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            text: "O texto abaixo complementa o resumo do card e ajuda a dar mais profundidade ao conteúdo exibido na página estática do slug.",
            version: 1,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
          },
        ],
      },
    ],
  },
});

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    INSERT INTO \`articles_blocks_rich_text_block\` (
      \`_order\`,
      \`_parent_id\`,
      \`_path\`,
      \`id\`,
      \`content\`,
      \`block_name\`
    )
    SELECT
      0,
      \`id\`,
      'body',
      1,
      ${amandaPostBody},
      'richTextBlock'
    FROM \`articles\`
    WHERE \`slug\` = 'amanda-post'
      AND NOT EXISTS (
        SELECT 1
        FROM \`articles_blocks_rich_text_block\`
        WHERE \`_parent_id\` = \`articles\`.\`id\`
          AND \`_path\` = 'body'
      );
  `);

  await db.run(sql`
    INSERT INTO \`_articles_v_blocks_rich_text_block\` (
      \`_order\`,
      \`_parent_id\`,
      \`_path\`,
      \`id\`,
      \`content\`,
      \`block_name\`
    )
    SELECT
      0,
      \`id\`,
      'body',
      1,
      ${amandaPostBody},
      'richTextBlock'
    FROM \`_articles_v\`
    WHERE \`parent_id\` = (
      SELECT \`id\` FROM \`articles\` WHERE \`slug\` = 'amanda-post' ORDER BY \`id\` DESC LIMIT 1
    )
      AND \`latest\` = 1
      AND NOT EXISTS (
        SELECT 1
        FROM \`_articles_v_blocks_rich_text_block\`
        WHERE \`_parent_id\` = \`_articles_v\`.\`id\`
          AND \`_path\` = 'body'
      );
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    DELETE FROM \`articles_blocks_rich_text_block\`
    WHERE \`_path\` = 'body'
      AND \`_parent_id\` = (
        SELECT \`id\` FROM \`articles\` WHERE \`slug\` = 'amanda-post' ORDER BY \`id\` DESC LIMIT 1
      );
  `);
  await db.run(sql`
    DELETE FROM \`_articles_v_blocks_rich_text_block\`
    WHERE \`_path\` = 'body'
      AND \`_parent_id\` = (
        SELECT \`id\` FROM \`_articles_v\` WHERE \`parent_id\` = (
          SELECT \`id\` FROM \`articles\` WHERE \`slug\` = 'amanda-post' ORDER BY \`id\` DESC LIMIT 1
        )
        ORDER BY \`id\` DESC LIMIT 1
      );
  `);
}
