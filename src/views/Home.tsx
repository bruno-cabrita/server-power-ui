import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import { Machine } from "~/types.ts";
import MachineCard from "~/components/MachineCard.tsx";

const Home: FC<{ machines: Machine[] }> = (props: { machines: Machine[] }) => {
  return (
    <BaseLayout>
      <h1>HomePage</h1>
      <a href="/">
        <button>Reload</button>
      </a>
      <div class="machine-holder">
        {props.machines.map((machine) => {
          return <MachineCard machine={machine} />;
        })}
      </div>
    </BaseLayout>
  );
};

export default Home;
