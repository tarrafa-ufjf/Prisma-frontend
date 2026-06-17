<p align="center">
  <img src="docs/assets/prisma_banner.png" alt="Prisma Banner" width="50%">
</p>

<p align="center">
  A web interface for academic monitoring through dashboards, indicators, and educational data visualizations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-004b8d" alt="Version">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-2fb594" alt="License"></a>
  <img src="https://img.shields.io/badge/Research-Tool-orange" alt="Tool">
</p>

# Tarrafa Frontend

This repository contains the Tarrafa frontend, a platform that supports academic monitoring through dashboards, indicators, and educational data visualizations.

It includes the screens and components used to browse courses, subjects, students, tutors, rankings, indicators, and administrative resources. The application connects to the Tarrafa backend for authentication and data access:

- Backend: [tarrafa-ufjf/Tarrafa-backend](https://github.com/tarrafa-ufjf/Tarrafa-backend)

## About the Project

Tarrafa aims to support academic performance analysis through interactive dashboards and visualizations. The interface centralizes key information for monitoring courses, subjects, tutors, and students, helping identify performance, risk, and engagement indicators.

This repository contains the web application, authentication-protected screens, API integration, interface internationalization, and visualization components used in the dashboards.

## Main Features

- Backend-integrated authentication.
- Home page with general indicators and rankings.
- Course selection and monitoring.
- Subject visualization with associated data.
- Tutor dashboards with indicators, rankings, and general data.
- Administrative area.
- Chatbot with support for Vega chart visualization.
- Internationalization support for Brazilian Portuguese and English.
- Chart, table, filter, ranking, and indicator components.

## Technologies

- [Next.js](https://nextjs.org/) 15
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [next-intl](https://next-intl.dev/) for internationalization
- [Axios](https://axios-http.com/) for API communication
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- Visualization libraries such as Nivo, Vega, Vega-Lite, AG Charts, and MUI X Charts

## Requirements

Before running the frontend, make sure you have installed:

- Node.js 20 or higher
- npm
- Tarrafa backend configured and running

See the backend README to configure the API correctly:

- [tarrafa-ufjf/Tarrafa-backend](https://github.com/tarrafa-ufjf/Tarrafa-backend)

## Environment Setup

1. Install the dependencies:

```bash
npm install
```

2. Create the environment file from the example:

```bash
cp .env.example .env
```

3. Configure the API URL in the `.env` file:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

Use the URL and port configured in the backend. This variable is used by the frontend to authenticate the user and consume the API endpoints.

## Running the Project

To start the development environment:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

The project uses the Next.js App Router. The main routes are located in `src/app/[locale]`, with authenticated pages grouped under `src/app/[locale]/(auth)`.

## Available Scripts

```bash
npm run dev
```

Starts the development server with Turbopack.

```bash
npm run build
```

Generates the production build.

```bash
npm run start
```

Runs the application in production mode after the build.

```bash
npm run lint
```

Runs the lint checks configured for the project.

## Project Structure

```text
src/
  app/                 Application routes with App Router
  components/          Page, UI, and template components
  hooks/               Reusable hooks
  i18n/                Internationalization configuration
  types/               TypeScript types
  utils/               Services, API client, and helper functions
messages/              Translation files
docs/                  Supporting project documentation
```

Important files:

- `.env.example`: example environment variables.
- `src/utils/api.ts`: Axios client for client-side requests.
- `src/utils/api-server.ts`: Axios client for server-side requests with cookie forwarding.
- `src/middleware.ts`: internationalization and authentication middleware.
- `docs/internacionalizacao.md`: standard used for interface translation.

## Internationalization

The project uses `next-intl` and currently supports:

- `en`: default language, with unprefixed URLs.
- `pt-BR`: Brazilian Portuguese, with the `/pt-BR` prefix.

Examples:

```text
/login
/pt-BR/login
/cursos
/pt-BR/cursos
```

When adding new interface text, update these files:

- `messages/en.json`
- `messages/pt-BR.json`

More details are available in [docs/internacionalizacao.md](docs/internacionalizacao.md).

## Backend Integration

This frontend depends on the backend to:

- Validate authentication through `auth/me`.
- Fetch course, subject, tutor, student, and indicator data.
- Maintain session cookies between the browser, middleware, and API.

During development, make sure that:

- The backend is running.
- `NEXT_PUBLIC_API_BASE_URL` points to the correct API URL.
- The backend CORS and cookie settings allow requests from the frontend.

## Development Workflow

A common routine for local development:

```bash
npm install
cp .env.example .env
npm run dev
```

In another terminal, keep the backend running according to the instructions in the [Tarrafa-backend](https://github.com/tarrafa-ufjf/Tarrafa-backend) repository.

## License

This project is licensed under the MIT License. See the license reference in [LICENSE](./LICENSE).
