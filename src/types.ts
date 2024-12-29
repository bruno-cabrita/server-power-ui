import { z } from "zod";
import { ServerSchema } from "~/schemas.ts";

export type Server = z.infer<typeof ServerSchema>;
