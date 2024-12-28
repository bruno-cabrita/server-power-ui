import type { FC } from "hono/jsx";
import Button from "~/components/Button.tsx";

const BaseLayout: FC = (props) => {
  return (
    <html lang="en" class="h-full">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MachinesPowa</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body class="min-h-100 bg-gray-950 text-gray-500 flex flex-col items-stretch">
        <header class="flex flex-row justify-between items-center px-4 py-2 border-b-2 border-gray-800">
          <h1 class="font-bold">MachinePowa</h1>
          <nav>
            <a href="/">
              <Button>Refresh</Button>
            </a>
          </nav>
        </header>
        {props.children}
      </body>
    </html>
  );
};

export default BaseLayout;
