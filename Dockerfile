FROM denoland/deno:debian
WORKDIR /app

COPY . .
RUN deno cache src/server.tsx

#USER deno
EXPOSE 8000

ENTRYPOINT [ "deno", "task", "serve" ]
