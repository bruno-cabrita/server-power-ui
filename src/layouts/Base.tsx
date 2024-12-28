import type { FC } from "hono/jsx";

const Layout: FC = ({ children }) => {
  return (
    <html lang="en" class="h-full">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server Power UI</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body class="min-h-100 bg-gray-950 text-gray-500 flex flex-col items-stretch">
        {children}
      </body>
    </html>
  );
};

export default Layout;
