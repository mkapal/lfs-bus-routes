import { PacketType } from "node-insim/packets";
import { useOnPacket } from "react-node-insim";

import { log } from "@/shared/log";
import { useMultiCarInfoRef } from "@/shared/useMultiCarInfoRef";

export function useDevCommands() {
  const multiCarInfoRef = useMultiCarInfoRef();

  useOnPacket(PacketType.ISP_III, (packet) => {
    switch (packet.Msg) {
      case "mci": {
        const multiCarInfo = multiCarInfoRef[packet.PLID];

        if (!multiCarInfo) {
          return;
        }

        // console.log(`PLID: ${multiCarInfo.PLID}`);
        log(`x: ${multiCarInfo.X},`);
        log(`y: ${multiCarInfo.Y},`);
        log(`z: ${multiCarInfo.Z},`);
        log(`heading: ${multiCarInfo.Heading},`);
        // console.log(`Speed: ${multiCarInfo.Speed}`);
        // console.log(`Direction: ${multiCarInfo.Direction}`);
        // console.log(`AngVel: ${multiCarInfo.AngVel}`);
        break;
      }
    }
  });
}
