# Fortune Teller Monorepo

This monorepo contains a Fortune Telling application with three main components:

## Structure

-   `backend/` - NestJS backend service that provides REST APIs for fortunes and categories
-   `ai-service/` - Python gRPC service that generates AI-powered fortunes
-   `shared/` - Shared config files, types, and utilities

# Getting Started

## Prerequisites

-   Node.js (v14 or later)
-   Python (v3.8 or later)
-   pnpm (v6 or later)
-   pipx (v1.0 or later)
-   Make (for running commands)

## Installations

```bash
npm i -g @nestjs/cli
pipx install poetry poethepoet

```

## Starting the Application

```bash
# Generate files
make generate-all
make start-all
```

# About

## Technologies Used

-   NestJS (Backend)
-   Prisma (ORM)
-   Python (AI Service)
-   gRPC (Service Communication)
-   SQLite (Database)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
