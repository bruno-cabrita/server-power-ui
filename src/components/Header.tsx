import { PropsWithChildren } from "hono/jsx";

function Component({ children }: PropsWithChildren) {
  return (
    <header class="flex flex-row justify-between items-center px-4 py-2 border-b-2 border-gray-800">
      <h1 class="font-bold py-1">Server Power UI</h1>
      {children}
    </header>
  );
}

export default Component;
