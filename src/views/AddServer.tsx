import type { FC } from "hono/jsx";
import BaseLayout from "~/layouts/Base.tsx";
import Header from "~/components/Header.tsx";

const View: FC = () => {
  return (
    <BaseLayout>
      <Header></Header>
      <div class="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        Add Server
      </div>
    </BaseLayout>
  );
};

export default View;
