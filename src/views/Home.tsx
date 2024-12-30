import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import { Server, Status } from "~/types.ts";
import ServerCard from "~/components/ServerCard.tsx";
import Header from "~/components/Header.tsx";
import Button from "~/components/Button.tsx";

type Props = {
  servers: Server[];
  status: Status;
};

const View: FC<Props> = (props: Props) => {
  return (
    <BaseLayout>
      <Header>
        <nav class="flex flex-row gap-2">
          <a href="/">
            <Button>Refresh</Button>
          </a>
        </nav>
      </Header>
      <div class="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {props.servers.map((server, idx) => {
          return <ServerCard server={server} status={props.status[idx]} />;
        })}
        <a
          href="/add-server"
          class="min-h-36 border-2 border-dashed border-gray-900 rounded-xl p-4 flex flex-col justify-center items-center gap-2 cursor-pointer overflow-hidden hover:border-gray-700 text-gray-800 hover:text-gray-600"
        >
          <h3 class="text-lg font-bold uppercase">Add Server</h3>
        </a>
      </div>
    </BaseLayout>
  );
};

export default View;
