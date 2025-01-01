import type { Alert, Server } from "~/types.ts";
import { useData } from "~/providers/data.ts";

async function Component({ alert }: { alert: Alert }) {
  const { servers } = await useData();
  const server = servers.find((server: Server) => server.id === alert.server);

  const message =
    alert.type === "add-server-success"
      ? `${server?.name} was successfully added.`
      : alert.type === "update-server-success"
        ? `${server?.name} was successfully updated.`
        : alert.type === "poweron-success"
          ? `${server?.name} was powered on. Wait a few minutes before refresh the page to confirm.`
          : alert.type === "poweroff-success"
            ? `${server?.name} was powered off. Wait a few minutes before refresh the page to confirm.`
            : alert.type === "delete-server-success"
              ? `The server was deleted successfully.`
              : "";

  const bgColor = alert.type.includes("success")
    ? "bg-green-700"
    : alert.type.includes("error")
      ? "bg-red-700"
      : "bg-sky-700";

  return (
    <section class="fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center animate-appear-bottom">
      <div class="px-4 py-3">
        <div class={`${bgColor} px-4 py-2 rounded-lg`}>
          <p class="text-white">{message}</p>
        </div>
      </div>
    </section>
  );
}

export default Component;
