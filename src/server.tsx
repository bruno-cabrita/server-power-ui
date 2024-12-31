import { type Context, Hono } from "hono";
import { serveStatic } from "hono/deno";
import { ServerSchema } from "~/schemas.ts";
import type { Server, Status, Alert, AlertType } from "~/types.ts";
import { useCommands } from "~/providers/commands.ts";
import { useData } from "~/providers/data.ts";
import AddServer from "~/views/AddServer.tsx";
import EditServer from "~/views/EditServer.tsx";
import Home from "~/views/Home.tsx";

const { addServer, updateServer, servers } = await useData();

const app = new Hono();

app.get("/*", serveStatic({ root: "./src/public/" }));

app.get("/", async (c: Context) => {
  const promises: Promise<boolean>[] = [];

  servers.forEach((server: Server) => {
    const { ping } = useCommands(server);
    promises.push(ping());
  });

  const values = await Promise.all(promises);

  const status: Status = servers.map((server: Server, idx: number) => ({
    id: server.id,
    online: values[idx],
  }));

  const url = new URL(c.req.url);

  const alert: Alert = {
    server: url.searchParams.get("server") || "",
    type: (url.searchParams.get("alert-type") as AlertType) || "info",
  };

  return c.html(<Home servers={servers!} status={status} alert={alert} />);
});

app.get("/add-server", (c: Context) => c.html(<AddServer />));

app.get("/edit-server/:id", (c: Context) => {
  const { id } = c.req.param();
  const server = servers?.find((item: Server) => item.id == id);
  if (!server) return c.notFound();

  return c.html(<EditServer server={server} />);
});

/*
 * Add Server
 */
app.post("/add-server", async (c: Context) => {
  const form = await c.req.formData();
  const formObj: Record<string, string> = {};
  formObj.id = crypto.randomUUID();
  form.forEach((value, key: string) => (formObj[key] = value as string));

  const { success, data } = ServerSchema.safeParse(formObj);

  if (!success) {
    return c.redirect("/add-server?form-error");
  }

  await addServer(data);

  return c.redirect(`/?server=${data.id}&alert-type=add-server-success`);
});

/*
 * Update Server
 */
app.post("/edit-server/:id", async (c: Context) => {
  const { id } = c.req.param();
  const server = servers?.find((item: Server) => item.id == id);
  if (!server) return c.notFound();

  const form = await c.req.formData();
  const formObj: Record<string, string> = {};
  form.forEach((value, key: string) => (formObj[key] = value as string));

  server.name = formObj.name;
  server.ip = formObj.ip;
  server.mac = formObj.mac;
  server.user = formObj.user;
  server.password ||= formObj.password;

  await updateServer(server);

  return c.redirect(`/?server=${server.id}&alert-type=updated-server-success`);
});

/*
 * POWER ON
 */
app.post("/power-on/:id", async (c: Context) => {
  const { id } = c.req.param();

  const server = servers?.find((item: Server) => item.id == id);

  if (!server) return c.notFound();

  console.log("[ INFO ] Powering on:", server.id);

  const { poweron } = useCommands(server);
  const res = await poweron();

  console.log("[ INFO ] Power on:", server.id, res);

  return c.redirect(`/?server=${server.id}&alert-type=poweron-success`);
});

/*
 * POWER OFF
 */
app.post("/power-off/:id", async (c: Context) => {
  const { id } = c.req.param();

  const server = servers?.find((item: Server) => item.id == id);

  if (!server) return c.notFound();

  console.log("[ INFO ] Powering off:", server.id);

  const { poweroff } = useCommands(server);
  const res = await poweroff();

  console.log("[ INFO ] Power off:", server.id, res);

  return c.redirect(`/?server=${server.id}&alert-type=poweroff-success`);
});

/*
 * PING
 */
app.post("/ping/:id", async (c: Context) => {
  const { id } = c.req.param();

  const server = servers?.find((item: Server) => item.id == id);

  if (!server) return c.notFound();

  console.log("[ INFO ] Pinging:", server.id);

  const { ping } = useCommands(server);
  const res = await ping();

  console.log("[ INFO ] Ping off:", server.id, res);

  return c.redirect("/");
});

Deno.serve({ port: 4000 }, app.fetch);
