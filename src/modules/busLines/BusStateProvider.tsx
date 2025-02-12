import { PacketType } from "node-insim/packets";
import { createContext, type ReactNode, useContext, useState } from "react";
import { useOnPacket } from "react-node-insim";

import { busStops } from "@/modules/busLines/lines";
import { getDistance, isWithinRadius } from "@/shared/coordinates";

export type BusState = {
  // isStoppedAtBusStop: boolean;
  distanceToBusStop: number | null;
  headingDelta: number | null;
};

const STOP_SPEED_THRESHOLD = 33; // ~0.1 m/s

type PlayerId = number;

type BusStateByPlayerId = Record<PlayerId, BusState>;

export type BusStateContextType = {
  busStateByPlayerId: BusStateByPlayerId;
};

const BusStateContext = createContext<BusStateContextType | null>(null);

type BusStateProviderProps = {
  children: ReactNode;
};

export function BusStateProvider({ children }: BusStateProviderProps) {
  const [busStateByPlayerId, setBusStateByPlayerId] =
    useState<BusStateByPlayerId>({});

  useOnPacket(PacketType.ISP_PLL, (packet) => {
    setBusStateByPlayerId((prevState) => {
      delete prevState[packet.PLID];

      return prevState;
    });
  });

  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((info) => {
      const busState = busStateByPlayerId[info.PLID];

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
            xy: 2 * 65536,
            z: 0.5 * 65536,
          },
        }),
      );

      if (
        (!busState ||
          busState.distanceToBusStop === null ||
          busState.headingDelta === null) &&
        info.Speed <= STOP_SPEED_THRESHOLD &&
        foundBusStop
      ) {
        const distanceToBusStop = getDistance(
          {
            x: info.X,
            y: info.Y,
            z: info.Z,
          },
          {
            x: foundBusStop.x,
            y: foundBusStop.y,
            z: foundBusStop.z,
          },
        );
        const headingDelta = Math.abs(info.Heading - foundBusStop.heading);

        setBusStateByPlayerId({
          ...busStateByPlayerId,
          [info.PLID]: {
            ...busState,
            distanceToBusStop,
            headingDelta,
          },
        });
        return;
      }

      if (
        busState &&
        busState.distanceToBusStop !== null &&
        busState.headingDelta !== null &&
        (info.Speed > STOP_SPEED_THRESHOLD || !foundBusStop)
      ) {
        setBusStateByPlayerId({
          ...busStateByPlayerId,
          [info.PLID]: {
            ...busState,
            distanceToBusStop: null,
            headingDelta: null,
          },
        });
        return;
      }
    });
  });

  return (
    <BusStateContext.Provider
      value={{
        busStateByPlayerId,
      }}
    >
      {children}
    </BusStateContext.Provider>
  );
}

export function useBusStateContext() {
  const context = useContext(BusStateContext);

  if (context === null) {
    throw new Error(
      "useBusStateContext hook must be called within <BusStateProvider>",
    );
  }

  return context;
}
