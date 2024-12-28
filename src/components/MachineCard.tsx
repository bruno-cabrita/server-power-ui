import { Machine } from "~/types.ts";

type Props = {
  machine: Machine;
};

function Component({ machine }: Props) {
  const { name, id } = machine;
  return (
    <div class="machine-card">
      <h2>{name}</h2>
      <form method="post" action={`/power-on/${id}`}>
        <button type="submit">
          Power On
        </button>
      </form>
      <form method="post" action={`/power-off/${id}`}>
        <button type="submit">
          Power Off
        </button>
      </form>
      <form method="post" action={`/ping/${id}`}>
        <button type="submit">
          Ping
        </button>
      </form>
    </div>
  );
}

export default Component;
