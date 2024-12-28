FROM denoland/deno:debian
WORKDIR /app

EXPOSE 8020

COPY . .
RUN deno cache src/server.tsx

ENTRYPOINT [ "deno", "task", "serve" ]
