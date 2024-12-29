import $ from "dax";
import { wake } from "wol";
import { type Context, Hono } from "hono";
import { serveStatic } from "hono/deno";
import { ServerSchema } from "~/schemas.ts";
import { Server } from "~/types.ts";
import { cmds } from "~/providers/commands.ts";
import { useData } from "~/providers/data.ts";
import AddServer from "~/views/AddServer.tsx";
import Home from "~/views/Home.tsx";

const { addServer, servers } = await useData();

const app = new Hono();

app.get("/*", serveStatic({ root: "./src/public/" }));

app.get("/", (c: Context) => c.html(<Home servers={servers!} />));
app.get("/add-server", (c: Context) => c.html(<AddServer />));

/*
 * ADD Server
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

  addServer(data);

  return c.redirect("/");
});
``;
/*
 * POWER ON
 */
app.post("/power-on/:id", async (c: Context) => {
  const { id } = c.req.param();

  const server = servers?.find((item: Server) => item.id == id);

  if (!server) return c.notFound();

  console.log("[ INFO ] Powering on:", server.id);

  await wake(server.mac);

  return c.redirect("/");
});

/*
 * POWER OFF
 */
app.post("/power-off/:id", async (c: Context) => {
  const { id } = c.req.param();

  const server = servers?.find((item: Server) => item.id == id);

  if (!server) return c.notFound();

  console.log("[ INFO ] Powering off:", server.id);

  const result = await $`${cmds.poweroff(server)}`.text("stdout");

  console.log("[ INFO ] stdout:", result);

  return c.redirect("/");
});

/*
 * PING
 */
app.post("/ping/:id", async (c: Context) => {
  const { id } = c.req.param();

  const server = servers?.find((item: Server) => item.id == id);

  if (!server) return c.notFound();

  console.log("[ INFO ] Pinging:", server.id);

  const result = await $`${cmds.ping(server)}`.text("stdout");

  console.log("[ INFO ] stdout:", result);

  return c.redirect("/");
});

Deno.serve({ port: 8020 }, app.fetch);
