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

  if (data!.length <= 0) {
    console.log("[ WARN ] No data!");
  }

  console.log("[  OK  ] Servers data file ok.");

  function addServer(server: Server) {
    console.log("TODO: addServer()", server);
  }

  return {
    servers: data,
    addServer,
  };
}

export { useData };
