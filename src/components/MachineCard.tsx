import { Machine } from "~/types.ts";
import Button from "~/components/Button.tsx";

type Props = {
  machine: Machine;
};

function Component({ machine }: Props) {
  const { name, id } = machine;
  return (
    <div class="border-2 border-gray-800 rounded-xl p-4 flex flex-col gap-2 overflow-hidden">
      <h2 class="-my-1 font-bold text-lg text-gray-400">{name}</h2>
      <div class="flex flex-col text-sm">
        <p>
          <strong>IP:</strong> {machine.ip}
        </p>
        <p>
          <strong>MAC:</strong> {machine.mac}
        </p>
      </div>
      <div class="flex flex-row gap-2">
        <form method="post" action={`/power-on/${id}`}>
          <Button type="submit">Power On</Button>
        </form>
        <form method="post" action={`/power-off/${id}`}>
          <Button type="submit">Power Off</Button>
        </form>
        <form method="post" action={`/ping/${id}`}>
          <Button type="submit">Ping</Button>
        </form>
      </div>
    </div>
  );
}

export default Component;
