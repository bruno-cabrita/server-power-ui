# Server Power UI

A Web UI to control local server power with Wake-On-Lan and SSH.

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
  },
  ...
]
```

## Commands

| Description    | Commands           |
| :------------- | :----------------- |
| Initialization | `deno task init`   |
| Lint + Format  | `deno task format` |
| Development    | `deno taks dev`    |
| Production     | `deno task prod`   |
