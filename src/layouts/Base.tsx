import type { FC } from "hono/jsx";

const BaseLayout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MachinesPowa</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        {props.children}
      </body>
    </html>
  );
};

export default BaseLayout;
