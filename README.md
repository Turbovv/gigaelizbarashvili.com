# gigaelizbarashvili.com

My personal portfolio website.

**Live:** [gigaelizbarashvili.com](https://gigaelizbarashvili.com)

## Stack

- [Next.js](https://nextjs.org) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) + [Drizzle ORM](https://orm.drizzle.team) (PostgreSQL)
- [NextAuth.js](https://authjs.dev) (GitHub)
- [next-intl](https://next-intl.dev) (English / Georgian)

## Getting Started

```bash
git clone https://github.com/turbovv/gigaelizbarashvili.com.git
cd gigaelizbarashvili.com
npm install
cp .env.example .env   # fill in the values
./start-database.sh    # optional: local Postgres via Docker
npm run db:push
npm run dev
```

## Environment Variables

| Variable               | Description                  |
| ---------------------- | ---------------------------- |
| `AUTH_SECRET`          | NextAuth secret              |
| `GITHUB_CLIENT_ID`     | GitHub OAuth app client ID   |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app secret      |
| `DATABASE_URL`         | PostgreSQL connection string |

## License

[MIT](LICENSE)

