import $ from "dax";
import { wake } from "wol";
import { Server } from "~/types.ts";

function useCommands(server: Server) {
  async function poweron() {
    await wake(server.mac);
    return true;
  }

  async function poweroff() {
    const res =
      await $`sshpass -p '${server.password}' ssh -o ConnectTimeout=2 -o StrictHostKeyChecking=no -o StrictHostKeyChecking=accept-new ${server.user}@${server.ip} "poweroff" | printf ''`
        .text(
          "combined",
        );
    return res.indexOf("Connection timed out") < 0 ? true : false;
  }

  async function ping() {
    const res =
      await $`ping -q -c 1 -W 1 ${server.ip} | awk '/^1 packets transmitted/ {print $4}'`
        .text(
          "combined",
        );
    return res == "1" ? true : false;
  }

  return {
    poweron,
    poweroff,
    ping,
  };
}

export { useCommands };
