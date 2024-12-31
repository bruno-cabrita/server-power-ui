import { z } from "zod";
import { ServerSchema } from "~/schemas.ts";

export type Server = z.infer<typeof ServerSchema>;

export type Status = {
  id: string;
  online: boolean;
}[];

export type AlertType =
  | "info"
  | "poweroff-success"
  | "poweroff-error"
  | "poweron-success"
  | "poweron-error"
  | "ping-success"
  | "ping-error"
  | "add-server-success"
  | "add-server-error"
  | "update-server-success"
  | "update-server-error"
  | "delete-server-success"
  | "delete-server-error";

export type Alert = {
  type: AlertType;
  server: string;
};
