import { PacketType } from "node-insim/packets";
import { createContext, type ReactNode, useContext, useState } from "react";
import { useOnPacket } from "react-node-insim";

import { useRealPlayerContext } from "@/global/RealPlayerContext";
import { busStops } from "@/modules/busLines/busStops";
import { isWithinRadius } from "@/shared/coordinates";
import {
  convertDegreesToLfsAngle,
  convertMetersToLfsCarPositionUnits,
} from "@/shared/lfsUnits";

const STOP_SPEED_THRESHOLD = 33; // ~0.1 m/s
const HEADING_THRESHOLD = convertDegreesToLfsAngle(5);
const XY_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(2.5);
const Z_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(0.5);

type BusStopStateContextType = {
  isStoppedAtBusStop: boolean;
};

const BusStopStateContext = createContext<BusStopStateContextType | null>(null);

type BusStopStateProviderProps = {
  children: ReactNode;
};

export function BusStopStateProvider({ children }: BusStopStateProviderProps) {
  const { realPlayer } = useRealPlayerContext();
  const [isStoppedAtBusStop, setIsStoppedAtBusStop] = useState(false);

  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((info) => {
      if (info.PLID !== realPlayer.PLID) {
        return;
      }

      const foundBusStop = busStops.find((busStop) =>
        isWithinRadius({
          current: {
            x: info.X,
            y: info.Y,
            z: info.Z,
          },
          target: {
            x: busStop.x,
            y: busStop.y,
            z: busStop.z,
          },
          thresholds: {
            xy: XY_POSITION_THRESHOLD,
            z: Z_POSITION_THRESHOLD,
          },
        }),
      );

      const isStopSpeed = info.Speed <= STOP_SPEED_THRESHOLD;
      const headingDelta = foundBusStop
        ? Math.abs(info.Heading - foundBusStop.heading)
        : null;
      const isGoodAngle =
        headingDelta === null ? false : headingDelta <= HEADING_THRESHOLD;

      if (!isStoppedAtBusStop && isStopSpeed && isGoodAngle && foundBusStop) {
        setIsStoppedAtBusStop(true);
        return;
      }

      if (
        (isStoppedAtBusStop &&
          (!isStopSpeed || !foundBusStop || !isGoodAngle)) ||
        !isStoppedAtBusStop
      ) {
        setIsStoppedAtBusStop(false);
        return;
      }
    });
  });

  return (
    <BusStopStateContext.Provider value={{ isStoppedAtBusStop }}>
      {children}
    </BusStopStateContext.Provider>
  );
}

export function useBusStopState() {
  const context = useContext(BusStopStateContext);

  if (context === null) {
    throw new Error(
      "useBusState hook must be called within <BusStateProvider>",
    );
  }

  return context;
}
