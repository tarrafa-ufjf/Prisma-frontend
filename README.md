<p align="center">
  <img src="docs/assets/prisma_banner.png" alt="Prisma Banner" width="75%">
</p>

<p align="center">
  Uma interface web para acompanhamento academico por meio de dashboards, indicadores e visualizacoes de dados educacionais.
</p>


<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-004b8d" alt="Version">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-2fb594" alt="License"></a>
  <img src="https://img.shields.io/badge/Research-Tool-orange" alt="Tool">
</p>

# Tarrafa Frontend

Este repositorio contem o frontend do Tarrafa, uma plataforma de apoio ao acompanhamento academico por meio de dashboards, indicadores e visualizacoes de dados educacionais.

Aqui estao as telas e componentes usados para navegar por cursos, disciplinas, alunos, tutores, rankings, indicadores e recursos administrativos. A aplicacao se conecta ao backend do Tarrafa para autenticacao e consulta dos dados:

- Backend: [tarrafa-ufjf/Tarrafa-backend](https://github.com/tarrafa-ufjf/Tarrafa-backend)

## Sobre o Projeto

O Tarrafa tem como objetivo apoiar a analise de desempenho academico por meio de paineis e visualizacoes interativas. A interface centraliza informacoes importantes para acompanhamento de cursos, disciplinas, tutores e estudantes, ajudando a identificar indicadores de desempenho, risco e engajamento.

Neste repositorio estao a aplicacao web, as telas protegidas por autenticacao, a integracao com a API, a internacionalizacao da interface e os componentes de visualizacao usados nos paineis.

## Principais Funcionalidades

- Autenticacao integrada ao backend.
- Pagina inicial com indicadores gerais e rankings.
- Selecao e acompanhamento de cursos.
- Visualizacao de disciplinas e seus dados associados.
- Paineis de tutores com indicadores, rankings e dados gerais.
- Area administrativa.
- Chatbot com suporte a visualizacao de graficos Vega.
- Suporte a internacionalizacao com portugues do Brasil e ingles.
- Componentes de graficos, tabelas, filtros, ranking e indicadores.

## Tecnologias

- [Next.js](https://nextjs.org/) 15
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [next-intl](https://next-intl.dev/) para internacionalizacao
- [Axios](https://axios-http.com/) para comunicacao com a API
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- Bibliotecas de visualizacao como Nivo, Vega, Vega-Lite, AG Charts e MUI X Charts

## Requisitos

Antes de rodar o frontend, tenha instalado:

- Node.js 20 ou superior
- npm
- Backend do Tarrafa configurado e em execucao

Consulte o README do backend para configurar a API corretamente:

- [tarrafa-ufjf/Tarrafa-backend](https://github.com/tarrafa-ufjf/Tarrafa-backend)

## Configuracao do Ambiente

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

3. Configure a URL da API no arquivo `.env`:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

Use a URL e porta configuradas no backend. Essa variavel e usada pelo frontend para autenticar o usuario e consumir os endpoints da API.

## Como Rodar

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicacao ficara disponivel em:

```text
http://localhost:3000
```

O projeto usa o App Router do Next.js. As rotas principais ficam dentro de `src/app/[locale]`, com paginas autenticadas agrupadas em `src/app/[locale]/(auth)`.

## Scripts Disponiveis

```bash
npm run dev
```

Inicia o servidor de desenvolvimento com Turbopack.

```bash
npm run build
```

Gera a build de producao.

```bash
npm run start
```

Executa a aplicacao em modo de producao apos a build.

```bash
npm run lint
```

Executa a verificacao de lint configurada para o projeto.

## Estrutura do Projeto

```text
src/
  app/                 Rotas da aplicacao com App Router
  components/          Componentes de paginas, UI e templates
  hooks/               Hooks reutilizaveis
  i18n/                Configuracao de internacionalizacao
  types/               Tipos TypeScript
  utils/               Servicos, cliente da API e funcoes auxiliares
messages/              Arquivos de traducao
docs/                  Documentacao auxiliar do projeto
```

Arquivos importantes:

- `.env.example`: exemplo das variaveis de ambiente.
- `src/utils/api.ts`: cliente Axios para chamadas feitas no client-side.
- `src/utils/api-server.ts`: cliente Axios para chamadas feitas no server-side com repasse de cookies.
- `src/middleware.ts`: middleware de internacionalizacao e autenticacao.
- `docs/internacionalizacao.md`: padrao usado para traducao da interface.

## Internacionalizacao

O projeto usa `next-intl` e atualmente possui suporte para:

- `en`: idioma padrao, com URLs sem prefixo.
- `pt-BR`: portugues do Brasil, com prefixo `/pt-BR`.

Exemplos:

```text
/login
/pt-BR/login
/cursos
/pt-BR/cursos
```

Ao adicionar textos novos na interface, atualize os arquivos:

- `messages/en.json`
- `messages/pt-BR.json`

Mais detalhes estao em [docs/internacionalizacao.md](docs/internacionalizacao.md).

## Integracao com o Backend

Este frontend depende do backend para:

- Validar autenticacao em `auth/me`.
- Buscar dados de cursos, disciplinas, tutores, alunos e indicadores.
- Manter cookies de sessao entre navegador, middleware e API.

Durante o desenvolvimento, confirme se:

- O backend esta rodando.
- `NEXT_PUBLIC_API_BASE_URL` aponta para a URL correta da API.
- As configuracoes de CORS e cookies do backend permitem requisicoes do frontend.

## Fluxo de Desenvolvimento

Uma rotina comum para desenvolvimento local:

```bash
npm install
cp .env.example .env
npm run dev
```

Em outro terminal, mantenha o backend em execucao conforme as instrucoes do repositorio [Tarrafa-backend](https://github.com/tarrafa-ufjf/Tarrafa-backend).

## Licenca

Este projeto segue a licenca MIT. Consulte a referencia de licenca em [LICENSE](./LICENSE).
