FROM node:18-alpine AS base

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm install -g pnpm 

COPY . .
RUN pnpm turbo prune @mestrado/api --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm install -g pnpm && pnpm install

COPY --from=builder /app/out/full/ .

RUN pnpm build:api:db:generate
RUN pnpm turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

COPY --from=installer /app/apps/api/prisma ./apps/api/prisma
COPY --from=installer /app/apps/api/prisma ./prisma

EXPOSE 3333

CMD ["sh", "-c", "sleep 10 && npx prisma migrate deploy && node apps/api/dist/infra/main.js"]
