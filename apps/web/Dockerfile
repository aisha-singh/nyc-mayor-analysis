# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=development
# pnpm is built-in via corepack; enable it
RUN corepack enable

# ---------- dev ----------
FROM base AS dev
# Only install web's deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["pnpm","dev"]

# ---------- prod-build ----------
FROM base AS build
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---------- prod-run ----------
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./
EXPOSE 3000
CMD ["pnpm","start"]
