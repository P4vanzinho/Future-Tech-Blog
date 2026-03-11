# Planejamento de Refatoração - Share Buttons

## Visão Geral

Documento de planejamento para corrections de código identificadas na branch `feat/share-buttons`.

---

## Problemas a Corrigir

### 1. DRY Violation - URL Repetida 🔴 Alta Prioridade

**Localização:**

- `src/components/blog/Post.tsx:53`
- `src/components/home/ArticlesPreviewByCategorySection.tsx:107-108`
- `src/components/home/FeaturedPostSection.tsx:71-72`

**Código Repetido:**

```typescript
`${typeof window !== "undefined" ? window.location.origin : ""}/posts/${post.slug}`;
```

**Solução Proposta:**
Criar função utilitária em `src/utils/post.ts`:

```typescript
export function getPostUrl(slug: string, baseUrl?: string): string {
  const origin =
    baseUrl ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${origin}/posts/${slug}`;
}
```

---

### 2. Verificação de Browser Repetida 🟡 Média Prioridade

**Problema:** `typeof window !== "undefined"` aparece em múltiplos lugares.

**Solução Proposta:**
Criar utilitário em `src/utils/browser.ts`:

```typescript
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
```

---

### 3. Campo `slug` Obrigatório 🟡 Média Prioridade

**Localização:** `src/types/post.ts:5`

**Problema:** `slug` foi adicionado como obrigatório, pode quebrar dados existentes.

**Solução Proposta:**

1. Manter como obrigatório se todos os dados forem migrados
2. Ou tornar opcional: `slug?: string` com fallback para id

---

### 6. Console.error Sem Feedback ao Usuário 🟢 Baixa Prioridade

**Localização:** `SharePopover.tsx:36`

**Problema:** Falha no copy apenas é logada, sem notificar usuário.

**Solução Proposta:**
Adicionar toast de erro ou usar estado de erro no componente.

---

### 7. Icons com Tamanhos Padrão Inconsistentes 🟢 Baixa Prioridade

**Localização:** `TwitterIcon.tsx`, `LinkedInIcon.tsx`, `CopyLinkIcon.tsx`

**Problema:** Novos icons têm default 16px, diferente de outros icons.

**Solução Proposta:**
Revisar e padronizar os defaults dos icons ou documentar o padrão.

---

### 8. Separação de Responsabilidades 🟡 Média Prioridade

**Localização:** `SharePopover.tsx`

**Problema:** Componente faz muita coisa:

- Gera URLs de share (linhas 24-28)
- Gerencia clipboard
- Gerencia native share
- Renderiza UI

**Solução Proposta:**
Extrair lógica em hooks/customizados:

- `useShareLinks(url, title)` - gera URLs de compartilhamento
- `useClipboard()` - gerencia copy to clipboard

---

### 9. Nome do Icon e Texto Desalinhados 🟢 Baixa Prioridade

**Localização:** `SharePopover.tsx:94`

**Problema:** Usa `TwitterIcon` mas mostra "Twitter / X"

**Solução Proposta:**

- Criar `XIcon` separado do `TwitterIcon`, ou
- Usar `XIcon` quando o texto for "X", ou
- Manter como está se intencional (compatibilidade)

---

## Ordem de Implementação Sugerida

1. **Item 1** (URL repetida) - Impacto mais alto
2. **Item 2** (isBrowser) - Dependência do item 1
3. **Item 8** (separação responsabilidades) - Melhora manutenibilidade
4. **Item 3** (slug obrigatório) - Estabilidade
5. **Itens 6, 7, 9** - Melhorias menores

---

## Considerações Adicionais

- Executar lint/typecheck após cada alteração
- Testar manualmente os fluxos de share
- Verificar compatibilidade com SSR do Next.js
