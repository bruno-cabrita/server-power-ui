import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import { Server } from "~/types.ts";
import MachineCard from "~/components/MachineCard.tsx";
import Header from "~/components/Header.tsx";
import Button from "~/components/Button.tsx";

const View: FC<{ servers: Server[] }> = (props: { servers: Server[] }) => {
  return (
    <BaseLayout>
      <Header>
        <nav class="flex flex-row gap-2">
          <a href="/">
            <Button>Refresh</Button>
          </a>
          <a href="/add-server">
            <Button>Add Server</Button>
          </a>
        </nav>
      </Header>
      <div class="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {props.servers.map((server) => {
          return <MachineCard machine={server} />;
        })}
      </div>
    </BaseLayout>
  );
};

export default View;
