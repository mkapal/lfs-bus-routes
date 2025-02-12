import { type CompCar, PacketType } from "node-insim/packets";
import { type ReactNode } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { useOnPacket } from "react-node-insim";

type MultiCarInfo = Record<number, CompCar>;

type MultiCarInfoContextType = {
  multiCarInfo: MultiCarInfo;
};

const MultiCarInfoContext = createContext<MultiCarInfoContextType | null>(null);

type MultiCarInfoContextProps = {
  children: ReactNode;
};

export function MultiCarInfoProvider({ children }: MultiCarInfoContextProps) {
  const [multiCarInfo, setMultiCarInfo] = useState<MultiCarInfo>({});

  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((compCar) => {
      setMultiCarInfo((prevState) => ({
        ...prevState,
        [compCar.PLID]: compCar,
      }));
    });
  });

  return (
    <MultiCarInfoContext.Provider value={{ multiCarInfo }}>
      {children}
    </MultiCarInfoContext.Provider>
  );
}

export function useMultiCarInfoContext() {
  const multiCarInfoContext = useContext(MultiCarInfoContext);

  if (multiCarInfoContext === null) {
    throw new Error(
      "useMultiCarInfoContext hook must be called within <MultiCarInfoContextProvider>",
    );
  }

  return multiCarInfoContext;
}
