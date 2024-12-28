import $ from "dax";
import { wake } from "wol";
import { Hono, type Context } from "hono";
import { serveStatic } from "hono/deno";
import { cmds } from "~/providers/commands.ts";
import machineData from "~/providers/data.ts";
import AddServer from "~/views/AddServer.tsx";
import Home from "~/views/Home.tsx";

const app = new Hono();

app.get("/*", serveStatic({ root: "./src/public/" }));

app.get("/", (c: Context) => c.html(<Home machines={machineData} />));
app.get("/add-server", (c: Context) => c.html(<AddServer />));

/*
 * POWER ON
 */
app.post("/power-on/:id", async (c) => {
  const { id } = c.req.param();

  const machine = machineData?.find((item) => item.id == id);

  if (!machine) return c.notFound();

  console.log("[ INFO ] Powering on:", machine.id);

  await wake(machine.mac);

  return c.redirect("/");
});

/*
 * POWER OFF
 */
app.post("/power-off/:id", async (c) => {
  const { id } = c.req.param();

  const machine = machineData?.find((item) => item.id == id);

  if (!machine) return c.notFound();

  console.log("[ INFO ] Powering off:", machine.id);

  const result = await $`${cmds.poweroff(machine)}`
    .quiet("stderr")
    .stdout("piped");

  console.log("[ INFO ] stdout:", result.stdout);

  return c.redirect("/");
});

/*
 * PING
 */
app.post("/ping/:id", async (c) => {
  const { id } = c.req.param();

  const machine = machineData?.find((item) => item.id == id);

  if (!machine) return c.notFound();

  console.log("[ INFO ] Pinging:", machine.id);

  const result = await $`${cmds.ping(machine)}`.quiet("stderr").stdout("piped");

  console.log("[ INFO ] stdout:", result.stdout);

  return c.redirect("/");
});

Deno.serve(app.fetch);
