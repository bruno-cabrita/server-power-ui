FROM denoland/deno:debian
WORKDIR /app

EXPOSE 4000

COPY . .
RUN deno cache src/server.tsx

ENTRYPOINT [ "deno", "task", "serve" ]
