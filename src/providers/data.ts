import { exists } from "@std/fs";
import { MachineSchema } from "~/schemas.ts";

const dataFilePath = "./data/machines.json";

const dataFileOk = await exists(dataFilePath, {
  isReadable: true,
  isFile: true,
});

if (!dataFileOk) {
  console.log("[ ERROR ] Data file not found!");
  Deno.exit();
}

const { success, data } = MachineSchema.array().safeParse(JSON.parse(
  await Deno.readTextFile(dataFilePath),
));

if (!success) {
  console.log("[ ERROR ] Invalid data file format!");
  Deno.exit();
}

if (data.length <= 0) {
  console.log("[ ERROR ] No data!");
  Deno.exit();
}

console.log("[  OK  ] Data file ok.");

export default data!;
