# Cloudflare R2 para arquivos do Payload

Este projeto usa o adapter S3 oficial do Payload para conversar com o Cloudflare R2. O R2 é compatível com a API S3, mas usa `region: "auto"` e um endpoint próprio.

## Arquitetura

- Vercel executa o Next.js e o Payload.
- Turso hospeda o banco libSQL.
- R2 armazena os bytes das imagens.
- O Admin do Payload solicita uma autorização temporária e envia o arquivo diretamente ao R2 quando `clientUploads` está ativo.
- O bucket permanece privado; as URLs continuam passando pelo Payload para preservar o controle de leitura da coleção `media`.

## Buckets

Crie dois buckets no Cloudflare R2:

- `future-tech-blog-media-dev`
- `future-tech-blog-media-prod`

Deixe a localização como automática e não habilite domínio público ou `r2.dev` nesta primeira fase.

## Tokens

Crie um token por ambiente em **R2 → Manage API Tokens**:

- Permissão: **Object Read & Write**.
- Escopo: somente o bucket do ambiente.
- Não use permissões administrativas.

Copie o **Access Key ID** e o **Secret Access Key** imediatamente. A secret key não pode ser recuperada depois.

## Endpoint e variáveis

O endpoint tem o formato:

```text
https://SEU_ACCOUNT_ID.r2.cloudflarestorage.com
```

No desenvolvimento local, use `.env.local` com os valores do bucket `dev`:

```env
MEDIA_STORAGE=r2
R2_BUCKET=future-tech-blog-media-dev
R2_REGION=auto
R2_ENDPOINT=https://SEU_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

No Vercel Preview use o bucket `dev`; em Production use o bucket `prod`. Nunca use o prefixo `NEXT_PUBLIC_` nas credenciais R2.

## Migração do banco

O adapter adiciona o campo interno `media.prefix` para salvar os objetos dentro da pasta lógica `media/`. Antes de publicar uma versão que usa R2, execute as migrações apontando para o banco correto:

```bash
NODE_ENV=production npm run migrate
```

Esse comando usa `DATABASE_URL`, `DATABASE_AUTH_TOKEN` e as variáveis R2 do ambiente. Execute-o uma vez por banco; não use `migrate:fresh` em um banco com dados.

Os downloads passam pela rota do Payload e são redirecionados para uma URL temporária assinada do R2. Assim o bucket continua privado e o navegador não precisa receber as credenciais do R2.

> Atenção: ativar o adapter não copia automaticamente arquivos que já estão no diretório `media/`. Antes de trocar um ambiente com conteúdo existente para R2, execute uma rotina de migração que preserve os registros de `media` (ou faça o reupload e repare as referências). Não remova os arquivos locais até confirmar que as imagens aparecem no bucket e no site.

## CORS

No bucket, abra **Settings → CORS Policy** e permita somente as origens reais da aplicação. Para desenvolvimento:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://dev-future-tech-blog.vercel.app"
    ],
    "AllowedMethods": ["PUT", "GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

O bucket de produção deve listar somente a origem de produção.

## Modo local

Para executar sem R2, defina `MEDIA_STORAGE=local`. Em produção, a validação exige `MEDIA_STORAGE=r2` e todas as variáveis R2.
