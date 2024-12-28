import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import { Machine } from "~/types.ts";
import MachineCard from "~/components/MachineCard.tsx";

const Home: FC<{ machines: Machine[] }> = (props: { machines: Machine[] }) => {
  return (
    <BaseLayout>
      <div class="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {props.machines.map((machine) => {
          return <MachineCard machine={machine} />;
        })}
      </div>
    </BaseLayout>
  );
};

export default Home;
