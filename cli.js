#!/usr/bin/env node
import { commandInfo, commandLock, commandUnlock } from './commands.js';

const device_url = get_device_url();
if (!device_url) {
  error(`You must set the env var HUAWEI_DEVICE_URL to your device url,\nincorporating your device's admin username and password.\nThe device url will look something like:\n\t "https://username:password@192.168.8.1/"`);
}
const command = get_command(process.argv);

if (!get_command(process.argv)) {
  error("Usage: huawei-lock lock (to band 28)ed/unlock (allow all bands) /info");
}

main(command, device_url);

function main(command, url) {
  switch (command) {
    case "info": commandInfo(url);
      break;
    case "lock": commandLock(url);
      break;
    case "unlock": commandUnlock(url);
      break;
    default:
      console.error("Invalid command found");
  }

}

function get_command(args) {
  const candidate = args[2]?.toLowerCase();
  if (candidate !== "lock" && candidate !== "unlock" && candidate !== "info") {
    return null;
  }

  return candidate;
}

function get_device_url() {
  return process.env["HUAWEI_DEVICE_URL"];
}

function error(msg) {
  console.error(msg);
  process.exit(1);
}
