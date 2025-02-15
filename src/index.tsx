import "./env";

import { InSimFlags, PacketType } from "node-insim/packets";
import { StrictMode } from "react";
import { createRoot } from "react-node-insim";

import { log } from "@/shared/log";

import { App } from "./App";
import * as trafficLights from "./modules/trafficLights/trafficLights";

const { render, inSim } = createRoot({
  name: "Driving InSim",
  host: process.env.HOST ?? "127.0.0.1",
  port: process.env.PORT ? parseInt(process.env.PORT) : 29999,
  adminPassword: process.env.ADMIN ?? "",
  flags: InSimFlags.ISF_MCI,
  interval: 500,
});

render(
  <StrictMode>
    <App />
  </StrictMode>,
);

inSim.on("connect", () => log("InSim connected"));
inSim.on("disconnect", () => log("InSim disconnected"));

inSim.on(PacketType.ISP_VER, (packet) => {
  log(`Connected to LFS ${packet.Product} ${packet.Version}`);

  trafficLights.initialize(inSim);

  // inSim.send(
  //   new IS_MTC({
  //     Text: "Driving InSim connected",
  //     UCID: 255,
  //     Sound: MessageSound.SND_SYSMESSAGE,
  //   }),
  // );
});

process.on("uncaughtException", (error) => {
  log(error);
  inSim.disconnect();
});
