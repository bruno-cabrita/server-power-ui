FROM denoland/deno:debian
WORKDIR /app

COPY . .
RUN deno cache src/server.tsx

#USER deno
EXPOSE 8000

ENTRYPOINT [ "deno", "run", "-NRE", "--unstable-net", "--allow-run", "--allow-sys", "src/server.tsx" ]
