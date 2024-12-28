import { PropsWithChildren } from "hono/jsx";

function Component({ children, ...props }: PropsWithChildren) {
  return (
    <button
      {...props}
      class="whitespace-nowrap border-2 rounded-lg py-1 px-3 cursor-pointer tracking-tight font-bold text-sm uppercase border-fuchsia-600 text-gray-400 hover:bg-black hover:text-fuchsia-600"
    >
      {children}
    </button>
  );
}

export default Component;
