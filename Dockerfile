FROM denoland/deno:debian-2.4.0 AS base
WORKDIR /app
EXPOSE 4000

RUN apt update && apt install -y ssh sshpass inetutils-ping

FROM base AS app

COPY . .
RUN deno cache src/server.tsx

ENTRYPOINT [ "deno", "task", "serve" ]
