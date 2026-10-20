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

# 実行用: standalone 出力だけを載せる（node_modules を丸ごと入れない）
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3210
ENV HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
# 実行時に fs で読む翻訳ファイルは standalone に含まれないので明示的にコピーする
COPY --from=build /app/locales ./locales
EXPOSE 3210
CMD ["node", "server.js"]
