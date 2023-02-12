// Would have preferred to use deno, but the huawei lib didn't
// work with it. Not worth pursuing
import { Connection, Device, Net } from "huawei-lte-api";

export async function commandInfo(device_url) {
  const conn = new Connection(device_url);
  await conn.ready;
  const device = new Device(conn);
  const info = await device.information();
  console.log(info);
  const net = new Net(conn);
  const modeList = await net.netModeList();
  console.log("modelist: \n", JSON.stringify(modeList));
  const bands = modeList.LTEBandList;
  console.log(bands);
  for (const band in bands) {
    console.log(band);
  }
}

export async function commandLock(device_url){
  console.log("Trying to lock to Band 28 ...");
  const conn = new Connection(device_url);
  await conn.ready;
  const net = new Net(conn);
  const result = await net.setNetMode("8000000", "3fffffff", "03");
  console.log(`${result}`);
};


export async function commandUnlock(device_url) {
  console.log("Trying to unlock (allow all available bands)");
  const conn = new Connection(device_url);
  await conn.ready;
  const net = new Net(conn);
  const result = await net.setNetMode("7FFFFFFFFFFFFFFF", "3fffffff", "03");
  console.log(`${result}`);
};


