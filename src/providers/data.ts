import { exists } from "fs";
import { ServerSchema } from "~/schemas.ts";
import { Server } from "../types.ts";

async function useData() {
  const dataFilePath = "./data/servers.json";

  const dataFileOk = await exists(dataFilePath, {
    isReadable: true,
    isFile: true,
  });

  if (!dataFileOk) {
    console.log("[ ERROR ] Data file not found!");
    await Deno.writeTextFile(dataFilePath, "[]");
  }

  const { success, data } = ServerSchema.array().safeParse(
    JSON.parse(await Deno.readTextFile(dataFilePath)),
  );

  if (!success || !data) {
    console.log("[ ERROR ] Invalid data file format!");
  }

  const servers = !success || !data ? [] : data;

  async function addServer(server: Server) {
    servers.push(server);
    await Deno.writeTextFile(dataFilePath, JSON.stringify(servers, null, "  "));
  }

  async function updateServer(server: Server) {
    const serverIdx = servers.findIndex(
      (item: Server) => item.id === server.id,
    );

    servers[serverIdx] = server;

    await Deno.writeTextFile(dataFilePath, JSON.stringify(servers, null, "  "));
  }

  return {
    servers,
    addServer,
    updateServer,
  };
}

export { useData };
