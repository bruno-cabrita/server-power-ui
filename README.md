# Server Power UI

A Web UI to control local servers power with Wake-On-Lan and SSH.

## Data

Create `data/data.json` file with the following format.

```json
[
  {
    "id": "example-server",
    "name": "Example Server",
    "mac": "00:00:00:00:00:0",
    "ip": "10.0.0.100",
    "user": "root",
    "password": "secret"
  }
  // ...
]
```

## Commands

| Description    | Commands           |
| :------------- | :----------------- |
| Initialization | `deno task init`   |
| Lint + Format  | `deno task format` |
| Development    | `deno taks dev`    |
| Production     | `deno task prod`   |

## Docker

| Description        | Commands                               |
| :----------------- | :------------------------------------- |
| Run container      | `docker compose up -d`                 |
| Enter docker shell | `docker exec -it server-power-ui bash` |
| Remove everything  | `docker compose down --rmi all -v`     |
