# Outlier Microfrontend

This project is a microfrontend for the Outlier Conference.

## Architecture

This project is built with the following technologies:

| Technology                              | Description                          | Quality Attribute                |
| --------------------------------------- | ------------------------------------ | -------------------------------- |
| [Docker](https://www.docker.com)        | Containerization platform            | `Performance`, `Maintainability` |
| [Next.js](https://nextjs.org)           | A React framework for production     | `Performance`, `Usability`       |
| [Drizzle](https://orm.drizzle.team)     | ORM for managing database and schema | `Usability`, `Maintainability`   |
| [Tailwind CSS](https://tailwindcss.com) | A utility-first CSS framework        | `Usability`, `Maintainability`   |
| [tRPC](https://trpc.io)                 | End-to-end typesafe APIs             | `Reliability`, `Maintainability` |

## Getting Started

Before getting started, make sure you have the following installed:

- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org)
- [Bun](https://bun.sh)

To get started, run the following commands:

```bash
# Install dependencies
bun install

# Create environment file
cp .env.example .env
```

To start the development server, run:

```bash
# Set up the database
docker compose up
bun db:generate
bun db:push
```

In a separate terminal, run:

```bash
# Start the development server
bun dev
```

To have a look in the database, run:

```bash
# Start the database IDE
bun db:studio
```
