# Internacionalizacao do frontend

Este documento define o padrao para internacionalizar o frontend. A ideia e manter as traducoes previsiveis, faceis de revisar e consistentes entre todas as telas.

## Visao geral

O projeto usa `next-intl` com o App Router do Next.js.

Arquivos principais:

- `messages/pt-BR.json`: textos em portugues do Brasil.
- `messages/en.json`: textos em ingles.
- `src/i18n/routing.ts`: idiomas suportados e idioma padrao.
- `src/i18n/request.ts`: carregamento das mensagens por idioma.
- `src/i18n/navigation.ts`: helpers de navegacao com suporte a idioma.
- `src/middleware.ts`: middleware de autenticacao integrado com o middleware de i18n.
- `src/app/[locale]/layout.tsx`: layout raiz com `NextIntlClientProvider`.

Idiomas configurados inicialmente:

- `en`: idioma padrao.
- `pt-BR`: portugues do Brasil.

O projeto usa `localePrefix: "as-needed"`. Na pratica: 

- Ingles usa URLs sem prefixo: `/login`, `/cursos`.
- Portugues usa prefixo: `/pt-BR/login`, `/pt-BR/cursos`.

## O que deve ser traduzido

Traduza textos fixos de interface:

- Titulos de paginas e secoes.
- Labels de formularios.
- Placeholders.
- Botoes.
- Mensagens de erro.
- Mensagens de vazio.
- Textos de loading.
- Nomes de abas, filtros e colunas fixas.
- Itens de menu e navegacao.
- Labels de graficos quando forem definidos no frontend.

Nao traduza diretamente dados vindos da API:

- Nome de estudante.
- Nome de tutor.
- Nome de curso/disciplina vindo do backend, como `curso.fullname`.
- Conteudo retornado por endpoints.

Se algum dado do backend precisar ser traduzido, isso deve ser tratado em uma decisao separada, preferencialmente com suporte da API.

## Organizacao das chaves

As traducoes devem ficar agrupadas por dominio ou componente.

Exemplo:

```json
{
  "Common": {
    "appName": "Projeto Prisma",
    "loading": "Carregando..."
  },
  "Login": {
    "subtitle": "Faca login em sua conta",
    "submit": "Entrar"
  },
  "Sidebar": {
    "home": "Pagina Principal",
    "courses": "Painel das Disciplinas"
  }
}
```

Use estes grupos como referencia:

- `Common`: textos reutilizaveis em varias partes do app.
- `Login`: tela de login.
- `Sidebar`: menu lateral.
- `Header`: cabecalhos e navegacao superior, se houver.
- `Home`: pagina inicial.
- `Courses`: telas de cursos/disciplinas.
- `Students`: telas de alunos.
- `Tutors`: telas de tutores.
- `Admin`: telas administrativas.
- `Tables`: labels comuns de tabelas.
- `Filters`: filtros reutilizaveis.
- `Errors`: erros genericos e estados de falha.

Evite chaves genericas demais fora de contexto, como:

```json
{
  "title": "Titulo"
}
```

Prefira:

```json
{
  "Courses": {
    "title": "Disciplinas"
  }
}
```

## Padrao de nomenclatura

Use nomes em ingles para as chaves, mesmo quando o valor estiver em portugues.

Bom:

```json
{
  "Login": {
    "forgotPassword": "Esqueceu a senha?",
    "invalidCredentials": "Email ou senha incorretos. Tente novamente."
  }
}
```

Evite:

```json
{
  "Login": {
    "esqueceuSenha": "Esqueceu a senha?"
  }
}
```

Regras:

- Use `camelCase` para nomes de chaves.
- Use nomes claros e especificos.
- Mantenha a mesma estrutura em todos os arquivos de idioma.
- Ao adicionar uma chave em `pt-BR.json`, adicione tambem em `en.json`.

## Como traduzir um Client Component

Client Components usam `useTranslations`.

Exemplo:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function LoginTitle() {
  const t = useTranslations("Login");

  return <h1>{t("subtitle")}</h1>;
}
```

Mensagem em `messages/pt-BR.json`:

```json
{
  "Login": {
    "subtitle": "Faca login em sua conta"
  }
}
```

Mensagem em `messages/en.json`:

```json
{
  "Login": {
    "subtitle": "Sign in to your account"
  }
}
```

## Como traduzir um Server Component

Server Components usam `getTranslations`.

Exemplo:

```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Courses");

  return <h1>{t("title")}</h1>;
}
```

## Como traduzir mensagens com variaveis

Use interpolacao do `next-intl`.

Mensagem:

```json
{
  "Courses": {
    "notFound": "Disciplina {courseId} nao encontrada."
  }
}
```

Uso:

```tsx
const t = useTranslations("Courses");

return <p>{t("notFound", { courseId: id })}</p>;
```

## Como traduzir plural

Use pluralizacao ICU.

Mensagem:

```json
{
  "Students": {
    "total": "{count, plural, =0 {Nenhum aluno} one {# aluno} other {# alunos}}"
  }
}
```

Uso:

```tsx
const t = useTranslations("Students");

return <p>{t("total", { count: students.length })}</p>;
```

## Navegacao e links

Para links e navegacao interna, prefira os helpers de `src/i18n/navigation.ts`.

Use:

```tsx
import { Link, useRouter } from "@/i18n/navigation";
```

Evite em novos codigos:

```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
```

Exemplo:

```tsx
import { Link } from "@/i18n/navigation";

export default function CoursesLink() {
  return <Link href="/cursos">Disciplinas</Link>;
}
```

Assim o app preserva o idioma atual ao navegar.

## Ordem recomendada para internacionalizar o app

Comece pelos componentes compartilhados:

1. Sidebar e menus.
2. Header, se aplicavel.
3. Botoes reutilizaveis.
4. Loading, erro e not found.
5. Tabelas, paginacao e filtros.

Depois siga pelas paginas:

1. Login.
2. Home.
3. Cursos/disciplinas.
4. Alunos.
5. Tutores.
6. Administrador.

Essa ordem reduz retrabalho, porque muitas paginas usam os mesmos componentes compartilhados.

## Passo a passo para traduzir uma tela

1. Abra o componente ou pagina.
2. Identifique textos fixos em JSX, placeholders, erros e labels.
3. Crie um namespace no `messages/pt-BR.json`, caso ainda nao exista.
4. Adicione as mesmas chaves no `messages/en.json`.
5. Substitua os textos fixos por `t("nomeDaChave")`.
6. Se o componente usa links internos, troque para `Link` ou `useRouter` de `@/i18n/navigation`.
7. Rode a aplicação.
8. Teste a tela em portugues e ingles.

Exemplo de antes:

```tsx
return <button>Entrar</button>;
```

Depois:

```tsx
const t = useTranslations("Login");

return <button>{t("submit")}</button>;
```

## Exemplo real ja implementado

A tela de login ja segue o padrao.

Arquivos:

- `src/components/auth/login.tsx`
- `messages/pt-BR.json`
- `messages/en.json`

Use essa tela como referencia para novas traducoes.

## Cuidados comuns

Nao concatene frases traduzidas em partes pequenas.

Evite:

```tsx
return <p>{t("course")} {id} {t("notFound")}</p>;
```

Prefira:

```json
{
  "Courses": {
    "notFound": "Disciplina {courseId} nao encontrada."
  }
}
```

```tsx
return <p>{t("notFound", { courseId: id })}</p>;
```

Isso permite que cada idioma controle a ordem da frase.

Tambem evite duplicar a mesma traducao em varios namespaces. Se o texto for realmente compartilhado, coloque em `Common`, `Errors`, `Tables` ou outro namespace comum.
