import { useSetAtom } from "jotai";
import { PacketType } from "node-insim/packets";
import { useHumanPlayerScope, useOnPacket } from "react-node-insim";

import { busStops } from "@/modules/bus/database/busStops";
import { busStopProximityAtom } from "@/modules/bus/routes/busStopProximityAtom";
import { isWithinRadius } from "@/shared/coordinates";
import { convertMetersToLfsCarPositionUnits } from "@/shared/lfsUnits";

const XY_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(25);
const Z_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(4);

export function useBusStopProximity() {
  const player = useHumanPlayerScope();
  const setBusStopProximity = useSetAtom(busStopProximityAtom);

  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((info) => {
      if (info.PLID !== player.PLID) {
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

      setBusStopProximity(foundBusStop ?? null);
    });
  });
}
