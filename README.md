<p align="center">
  <img src="docs/assets/prisma_banner.png" alt="Prisma Banner" width="65%">
</p>

<p align="center">
  A web interface to support academic monitoring through indicators, rankings, dashboards and educational visualizations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-004b8d" alt="Version">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-2fb594" alt="License"></a>
  <img src="https://img.shields.io/badge/Academic-Monitoring-orange" alt="Academic Monitoring">
  <img src="https://img.shields.io/badge/i18n-pt--BR%20%7C%20en-7c3aed" alt="Languages">
</p>

<h4 align="center">
  <a href="#about-prisma">About</a> |
  <a href="#why-the-project-exists">Motivation</a> |
  <a href="#what-the-interface-offers">Features</a> |
  <a href="#interface-overview">Interface</a> |
  <a href="#running-locally">Running</a>
</h4>

📝 **Available in other languages:** [Português (Brasil)](./README.pt-BR.md)

# Prisma Frontend

**Prisma Frontend** is the interface layer of the Prisma project, a platform designed for monitoring disciplines, students and tutors in educational contexts.

The project's purpose is to transform academic data into a clearer visual experience to support performance, risk, participation and pedagogical monitoring analyses. Rather than presenting only isolated tables or static reports, Prisma organizes indicators, rankings and graphs into navigable panels, allowing different user profiles to quickly find relevant signals about students' academic trajectories.

This repository contains the web application. The API, authentication and access rules are in the backend:

- Backend: [tarrafa-ufjf/Prisma-backend](https://github.com/tarrafa-ufjf/Prisma-backend)

## Demo

<p align="center">
  <img src="docs/assets/gif_interface.gif" alt="Prisma interface demonstration" width="85%">
</p>

## About Prisma

Prisma was born from the need to monitor large volumes of academic information in a more accessible way. In educational environments, data about disciplines, activities, students, tutors and performance often exist in different systems or appear in a way that is not user-friendly for decision-making.

The interface seeks to reduce the distance between data and interpretation. It centralizes important information and presents visualizations that help identify patterns, compare scenarios and highlight points that deserve attention.

The focus is not to replace human analysis, but to expand its capacity: to offer a more organized view so that coordinators, teachers, tutors and monitoring teams can investigate academic situations with more context.

## Why the project exists

Academic monitoring depends on questions that are not always simple to answer by looking at raw data:

- Which disciplines concentrate greater signals of difficulty?
- Which students may need closer monitoring?
- How are indicators of participation, performance and dropout distributed among disciplines?
- Which tutors, classes or components show more outstanding results?
- Where are there patterns that deserve more careful pedagogical investigation?

Prisma organizes these questions into a visual experience. Rankings, graphs, indicators and filters help transform scattered data into interpretable clues.

## Who it's for

The project was designed for people involved in academic monitoring and management:

- **Coordinators and managers**, who need to observe the panorama of disciplines.
- **Teachers and tutors**, who follow classes, activities and students.
- **Pedagogical teams**, who investigate risk, participation and performance.
- **Researchers**, who analyze educational data and learning indicators.
- **Administrators**, who need to maintain resources and system support information.

## What the interface offers

Prisma Frontend brings together screens and components to explore different levels of academic information:

- **Homepage with general indicators**, rankings and aggregated views.
- **Discipline selection and monitoring**, with filters and associated data for navigating specific contexts.
- **Student panels**, with personal data, indicators and activity graphs.
- **Tutor panels**, with general data, rankings and related indicators.
- **Administrative area**, aimed at system management resources.
- **Chatbot with Vega visualization support**, allowing exploration of responses and graphs.
- **Internationalization**, with support for Brazilian Portuguese and English.

## Interface overview

Prisma's navigation was organized to go from the general panorama to detail:

| Area | Role in the experience |
| --- | --- |
| Home | Presents an overall view of the academic environment, with indicators and rankings. |
| Disciplines | Allows you to select a discipline, monitor its main data and use filters for exploration. |
| Students | Shows lists and individual pages of students. |
| Tutors | Displays data, indicators and rankings related to tutoring. |
| Chatbot | Supports queries and visualizations generated from data. |
| Administrator | Groups system management and maintenance screens. |

## How Prisma interprets data

The project combines different forms of visualization to support complementary readings:

- **Indicators** highlight synthetic signals, such as performance, risk or engagement.
- **Rankings** help compare disciplines, students or tutors.
- **Graphs** show distributions, evolutions and relationships between variables.
- **Tables and filters** allow for more direct and granular investigation.
- **Individual panels** connect general information to specific trajectories.

These resources were designed to promote progressive reading: first the user identifies a relevant signal, then deepens the analysis on more specific screens.

## Relationship with the backend

This frontend depends on Prisma Backend to obtain data, validate sessions and maintain integration with academic sources used by the project.

In general terms:

- The frontend presents and organizes the user experience.
- The backend provides data, authentication and access rules.
- Communication between the two happens through the URL configured in `NEXT_PUBLIC_API_BASE_URL`.

For complete project execution, both repositories must be configured.

## Main technologies

The project uses Next.js, React, TypeScript, Tailwind CSS, Material UI, next-intl, Axios and visualization libraries such as Nivo, Vega, Vega-Lite, AG Charts and MUI X Charts.

## Running locally

Before starting, have the backend configured and running. Then, in the frontend repository:

```bash
npm install
cp .env.example .env
npm run dev
```

Configure the API URL in the `.env` file:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

The application is available at:

```text
http://localhost:3000
```

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the development environment with Turbopack. |
| `npm run build` | Generates the production version. |
| `npm run start` | Runs the application after build. |
| `npm run lint` | Runs configured lint checks. |

## Repository structure

```text
src/
  app/                 Application routes with App Router
  components/          Page components, interface and templates
  hooks/               Reusable hooks
  i18n/                Internationalization configuration
  types/               TypeScript types
  utils/               API client, services and helper functions
messages/              Translation files
docs/                  Documentation and support images
```

## Internationalization

The interface supports:

- `en`: default language, with URLs without prefix.
- `pt-BR`: Brazilian Portuguese, with `/pt-BR` prefix.

When adding new text to the interface, update:

- `messages/en.json`
- `messages/pt-BR.json`

More details are in [docs/internacionalizacao.md](docs/internacionalizacao.md).

## Project status

Prisma Frontend is under development as part of an academic educational monitoring initiative. The interface can still evolve in visual organization, indicator coverage, user experience and integration with new data sources.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
