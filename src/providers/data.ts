import { exists } from "fs";
import { MachineSchema } from "~/schemas.ts";

const dataFilePath = "./data/data.json";

const dataFileOk = await exists(dataFilePath, {
  isReadable: true,
  isFile: true,
});

if (!dataFileOk) {
  console.log("[ ERROR ] Data file not found!");
  await Deno.writeTextFile("data/data.json", "[]");
}

const { success, data } = MachineSchema.array().safeParse(
  JSON.parse(await Deno.readTextFile(dataFilePath)),
);

if (!success) {
  console.log("[ ERROR ] Invalid data file format!");
}

if (data.length <= 0) {
  console.log("[ ERROR ] No data!");
}

console.log("[  OK  ] Data file ok.");

export default data!;
