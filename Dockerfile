FROM node:22-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

FROM base AS build
ENV NEXT_PUBLIC_BASE_PATH=
ENV NEXT_PUBLIC_ENABLE_SENTRY=0
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3210
COPY --from=build /app ./
EXPOSE 3210
CMD ["npx", "next", "start", "-p", "3210"]
