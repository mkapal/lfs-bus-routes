import { PacketType } from "node-insim/packets";
import { useOnPacket } from "react-node-insim";

import { busStops } from "@/modules/busLines/busStops";
import { usePlayerScope } from "@/scopes/playerScope";
import { isWithinRadius } from "@/shared/coordinates";
import {
  convertDegreesToLfsAngle,
  convertMetersToLfsCarPositionUnits,
} from "@/shared/lfsUnits";

import { useBusStop } from "./useBusStop";

const STOP_SPEED_THRESHOLD = 33; // ~0.1 m/s
const HEADING_THRESHOLD = convertDegreesToLfsAngle(5);
const XY_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(2.5);
const Z_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(0.5);

export function useBusStopDetector() {
  const player = usePlayerScope();
  const setBusStop = useBusStop.set();

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

      const isStopSpeed = info.Speed <= STOP_SPEED_THRESHOLD;
      const headingDelta = foundBusStop
        ? Math.abs(info.Heading - foundBusStop.heading)
        : null;
      const isGoodAngle =
        headingDelta === null ? false : headingDelta <= HEADING_THRESHOLD;

      setBusStop(
        isStopSpeed && isGoodAngle && foundBusStop ? foundBusStop.id : null,
      );
    });
  });
}
