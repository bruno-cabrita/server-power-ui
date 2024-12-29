import { Server } from "~/types.ts";
import Button from "~/components/Button.tsx";

type Props = {
  server: Server;
};

function Component({ server }: Props) {
  return (
    <div class="border-2 border-gray-800 rounded-xl p-4 flex flex-col gap-2 overflow-hidden">
      <h2 class="-my-1 font-bold text-lg text-gray-400 hover:text-fuchsia-400 hover:underline">
        <a href={`/edit-server/${server.id}`}>{server.name}</a>
      </h2>
      <div class="flex flex-col text-sm">
        <p>
          <strong>IP:</strong> {server.ip}
        </p>
        <p>
          <strong>MAC:</strong> {server.mac}
        </p>
      </div>
      <div class="flex flex-row gap-2">
        <form method="post" action={`/power-on/${server.id}`}>
          <Button type="submit">Power On</Button>
        </form>
        <form method="post" action={`/power-off/${server.id}`}>
          <Button type="submit">Power Off</Button>
        </form>
        <form method="post" action={`/ping/${server.id}`}>
          <Button type="submit">Ping</Button>
        </form>
      </div>
    </div>
  );
}

export default Component;
