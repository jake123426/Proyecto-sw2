FROM node:20.19.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
RUN printf "NODE_ENV=production\nPORT=3000\nOPENAI_API_KEY=sk-FQYv6fx3KV8\n" > .env


FROM node:20.19.0-alpine3.21
WORKDIR /app
COPY --from=builder /app .
USER node
EXPOSE 3000
CMD ["node", "app.js"]