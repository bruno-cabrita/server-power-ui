import $ from "dax";
import { wake } from "wol";
import { Server } from "~/types.ts";

function useCommands(server: Server) {
  async function poweron() {
    const res = await wake(server.mac);
    console.log("poweron()", res);
    return res;
  }

  async function poweroff() {
    const res =
      await $`sshpass -p '${server.password}' ssh -o ConnectTimeout=2 -o StrictHostKeyChecking=no ${server.user}@${server.ip} "poweroff"`
        .stdout("piped")
        .stderr("piped");
    console.log("poweroff() code:", res.code);
    console.log("poweroff() stderr:", res.stderr);
    console.log("poweroff() stdout:", res.stdout);
    return res.stdout;
  }

  async function ping() {
    const res = await $`ping -q -c 1 ${server.ip}`
      .pipe($`awk '/^1 packets transmitted/ {print $4}'`)
      .text();
    // .stderr("piped");
    // .quiet("stderr");

    console.log("ping():", res);
    // console.log("ping() code:", res.code);
    // console.log("ping() stderr:", res.stderr);
    // console.log("ping() stdout:", res.stdout);
    return res.stdout == "0" ? false : true;
  }

  return {
    poweron,
    poweroff,
    ping,
  };
}

export { useCommands };
