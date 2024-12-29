import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import { Server } from "~/types.ts";
import Header from "~/components/Header.tsx";
import Button from "~/components/Button.tsx";

const View: FC<{ server: Server }> = ({ server }: { server: Server }) => {
  return (
    <BaseLayout>
      <Header>
        <nav class="flex flex-row gap-2">
          <a href="/">
            <Button>Back</Button>
          </a>
        </nav>
      </Header>
      <div class="mx-auto px-4 py-6">
        <form
          method="post"
          class="border-2 border-gray-800 rounded-xl p-4 grid grid-cols-[110px_180px] gap-2 items-center overflow-hidden"
        >
          <label
            for="name"
            class="justify-self-end font-bold text-sm uppercase tracking-tight"
          >
            Name:
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            placeholder="Example Server"
            value={server.name}
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <label
            for="mac"
            class="justify-self-end font-bold text-sm uppercase tracking-tight"
          >
            Mac Address:
          </label>
          <input
            required
            id="mac"
            name="mac"
            type="text"
            placeholder="00:00:00:00:00:00"
            value={server.mac}
            pattern="^[0-9a-fA-F]{1,2}(:[0-9a-fA-F]{1,2}){5}$"
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <label
            for="ip"
            class="justify-self-end font-bold text-sm uppercase tracking-tight"
          >
            IP Address:
          </label>
          <input
            required
            id="ip"
            name="ip"
            type="text"
            placeholder="10.0.0.100"
            value={server.ip}
            minlength={7}
            maxlength={15}
            size={15}
            pattern="^(?>(\d|[1-9]\d{2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(?1)$"
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <label
            for="user"
            class="justify-self-end font-bold text-sm uppercase tracking-tight"
          >
            User:
          </label>
          <input
            required
            id="user"
            name="user"
            type="text"
            placeholder="root"
            value={server.user}
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <label
            for="password"
            class="justify-self-end font-bold text-sm uppercase tracking-tight"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Same passoword"
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <div class="col-span-2 flex flex-row justify-center mt-4">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default View;
