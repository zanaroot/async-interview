# Next-app

This project aim to provided a high quality and optimized next.js project.

We will be very hard on code quality, performance and security compliance.

## First launch

### Install dependencies

```bash
pnpm i
```

### DB migration

```bash
pnpm db:migrate
```

### Start

```bash
pnpm dev
```

### Generate DB migration file

```bash
pnpm db:generate
```

### Add shadcn/ui components

```bash
pnpm ui:add
```

## Project structure

### actions

Will contain all the server actions.

Each action will be a file.

Each file will contain a function.

The function must be an `async` function.

a `'use server'` must be present on top of the file.

### app

The core view of the application.

It will contain all local the components according to it's page and anything related to UI view.

Must follow the `next.js` structure and rules.

### components

Contains all high order components used accrose multiple pages.

Contains also all the shadcn/ui auto generated components.

### hooks

Contains all the hooks used accrose multiple pages.

Contains also all the shadcn/ui auto generated hooks.

### lib

Utils functions.

One file is related to one _module_.

### locales

Will contain all the translations.

### models

Will contain all the database models.

Each model will be a folder.

Each folder will contain a `index.ts` file and a `type.ts`.

It can occasionally contains a transaction.ts file.

A transaction.ts file must and only contain a function that does operations on the database at a transaction level.

A file must and only contain a function that does operations on the database.

Each file name must be prefixed with `$` to keep the model file on top of other files.

FIle prefixed with `$` must have a `server only` modifier.

### packages

This folder will contain all the hand made packages used accrose multiple pages.

This is not opened to regular update. If you need to touch it everytime, something may be off somewhere.

### validator (experimental)

A questionable folder for now.

Want to get rid of it. Still trying to figure out how to do it.

## Pre commit

Better to execute them following this order.

### Lint

```bash
pnpm lint
```

### Typecheck

```bash
pnpm typecheck
```

### Format

```bash
pnpm format:fix
```

## Rules

Each folders may have it's own rules.

If it's the case, a `README.md` file may be present.

## Need help

### Drizzle studio

Help on drizzle studio compatibilty with Docker.

### Permission

Permissions over some file are blocking the `linter` feedback's correction.
