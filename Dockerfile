FROM denoland/deno:debian-2.4.1 AS base
WORKDIR /app
EXPOSE 4000

RUN apt update && apt install -y ssh sshpass inetutils-ping

FROM base AS install
COPY deno.json deno.lock .
RUN deno task install

FROM base AS build
COPY --from=install /app/node_modules .
COPY . .
RUN deno task build

ENTRYPOINT [ "deno", "run", "serve" ]
