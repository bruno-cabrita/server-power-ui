FROM denoland/deno:debian AS base
WORKDIR /app

RUN apt update && apt install -y ssh sshpass inetutils-ping

FROM base AS app

COPY . .
RUN deno cache src/server.tsx

EXPOSE 4000

ENTRYPOINT [ "deno", "task", "serve" ]
