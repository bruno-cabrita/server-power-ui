import { Machine } from "~/types.ts";

export const cmds = {
  poweroff: (machine: Machine) =>
    `sshpass -p ${machine.password} ssh ${machine.user}@${machine.ip} "poweroff"`,
  ping: (machine: Machine) =>
    `ping -q -c 1 ${machine.ip} 2>/dev/null | awk '/^1 packets transmitted/ {print $4}'`,
};
