# Server Power UI

A Web UI to control local servers power with Wake-On-Lan and SSH.


## Commands

| Description    | Commands            |
| :------------- | :------------------ |
| Initialization | `deno task init`    |
| Development    | `deno taks dev`     |
| Lint + Format  | `deno task format`  |
| Build          | `deno task build`   |
| Preview        | `deno task preview` |

## Docker

| Description        | Commands                               |
| :----------------- | :------------------------------------- |
| Run container      | `docker compose up -d`                 |
| Enter docker shell | `docker exec -it server-power-ui bash` |
| Remove everything  | `docker compose down --rmi all -v`     |
