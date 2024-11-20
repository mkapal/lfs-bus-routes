import "./env";
import { IS_MTC, MessageSound, PacketType } from "node-insim/packets";
import { createRoot } from "react-node-insim";
import { App } from "./App";
import { log } from "./utils/log";

const { render, inSim } = createRoot({
  name: "Driving InSim",
  host: process.env.HOST ?? "127.0.0.1",
  port: process.env.PORT ? parseInt(process.env.PORT) : 29999,
  adminPassword: process.env.ADMIN ?? "",
});

render(<App />);

inSim.on("connect", () => log("InSim connected"));
inSim.on("disconnect", () => log("InSim disconnected"));

inSim.on(PacketType.ISP_VER, (packet) => {
  log(`Connected to LFS ${packet.Product} ${packet.Version}`);

  inSim.send(
    new IS_MTC({
      Text: "Driving InSim connected",
      UCID: 255,
      Sound: MessageSound.SND_SYSMESSAGE,
    }),
  );
});

process.on("uncaughtException", (error) => {
  log(error);
  inSim.disconnect();
});
