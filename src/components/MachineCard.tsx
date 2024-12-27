import { Machine } from "~/types.ts";

type Props = {
  machine: Machine,
}

function Component({ machine }: Props) {
  return (
    <div class="machine-card">
      <h2>{machine.name}</h2>
      <form method="post" action={`/power-on/${machine.id}`}>
        <button type="submit" >
          Power On
        </button>
      </form>
    </div>
  );
};

export default Component;
