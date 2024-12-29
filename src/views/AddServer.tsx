import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import Header from "~/components/Header.tsx";
import Button from "~/components/Button.tsx";

const View: FC = () => {
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
            value="Example Server"
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
            value="00:00:00:00:00:00"
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
            value="10.0.0.100"
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
            value="root"
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <label
            for="password"
            class="justify-self-end font-bold text-sm uppercase tracking-tight"
          >
            Password:
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            value="secret"
            class="rounded-lg py-1 px-2 bg-gray-950 border-2 border-gray-600 text-gray-400"
          />
          <div class="col-span-2 flex flex-row justify-center mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default View;
