import { type CompCar, PacketType } from "node-insim/packets";
import { useOnPacket } from "react-node-insim";

type MultiCarInfo = Record<number, CompCar>;

const multiCarInfo: MultiCarInfo = {};

export function useMultiCarInfoRef() {
  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((compCar) => {
      multiCarInfo[compCar.PLID] = compCar;
    });
  });

  return multiCarInfo;
}
