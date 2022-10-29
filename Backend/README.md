# Backend

## Requirement
- Sqlite
- Node.js LTS >= 16

## Setup / Reset
1. ``pnpm install``
2. ``pnpm update``
3. ``npx prisma migrate reset -f``
4. ``npx prisma migrate dev --name init``
5. ``npx prisma generate``

## Run
Create ``.env`` from ``.env.example`` then start backend with this command
``pnpm run start``