import { atom, useAtomValue, useSetAtom } from "jotai";
import { type CompCar, PacketType } from "node-insim/packets";
import { useOnPacket } from "react-node-insim";

type MultiCarInfo = Record<number, CompCar>;

const multiCarInfoAtom = atom<MultiCarInfo>({});

export function useMultiCarInfo() {
  return useAtomValue(multiCarInfoAtom);
}

export function useMultiCarInfoCollector() {
  const setMultiCarInfo = useSetAtom(multiCarInfoAtom);

  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((compCar) => {
      setMultiCarInfo((prevState) => ({
        ...prevState,
        [compCar.PLID]: compCar,
      }));
    });
  });
}
