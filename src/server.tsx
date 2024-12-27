import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import Home from "~/views/Home.tsx";
import machineData from "~/providers/data.ts";
import { wake } from "wol";

const app = new Hono();

app.get("/*", serveStatic({ root: "./src/public/" }));

app.get("/", (c) => c.html(<Home machines={machineData} />));

app.post("/power-on/:id", async (c) => {
  const { id } = c.req.param();

  const machine = machineData?.find((item) => item.id == id);

  if(!machine) return c.notFound();

  await wake(machine.mac);

  return c.redirect("/");

});


Deno.serve(app.fetch);
