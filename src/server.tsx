import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import Home from "~/views/Home.tsx";
import machineData from "~/providers/data.ts";
import { wake } from "wol";
import $ from "dax";
import { cmds } from "~/providers/commands.ts";

const app = new Hono();

app.get("/*", serveStatic({ root: "./src/public/" }));

app.get("/", (c) => c.html(<Home machines={machineData} />));

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
