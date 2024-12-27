import { z } from "zod";
import { MachineSchema } from "~/schemas.ts";

export type Machine = z.infer<typeof MachineSchema>;
