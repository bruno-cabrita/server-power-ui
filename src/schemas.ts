import { z } from "zod";

export const MachineSchema = z.object({
  id: z.string(),
  name: z.string(),
  mac: z.string().regex(
    /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}.[0-9a-fA-F]{4}.[0-9a-fA-F]{4})$/,
  ),
  ip: z.string().ip({ version: "v4" }),
});
