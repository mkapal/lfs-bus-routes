import { useAtom } from "jotai";
import { PacketType } from "node-insim/packets";
import { useHumanPlayerScope, useOnPacket } from "react-node-insim";

import { busStops } from "@/modules/bus/database/busStops";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { isWithinRadius } from "@/shared/coordinates";
import {
  convertDegreesToLfsAngle,
  convertMetersToLfsCarPositionUnits,
} from "@/shared/lfsUnits";

const STOP_SPEED_THRESHOLD = 33; // ~0.1 m/s
const HEADING_THRESHOLD = convertDegreesToLfsAngle(5);
const XY_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(2.5);
const Z_POSITION_THRESHOLD = convertMetersToLfsCarPositionUnits(0.5);

export function useCurrentBusStopDetector() {
  const player = useHumanPlayerScope();
  const [currentLineState, setCurrentLineState] = useAtom(currentLineStateAtom);

  useOnPacket(PacketType.ISP_MCI, (packet) => {
    packet.Info.forEach((info) => {
      if (info.PLID !== player.PLID) {
        return;
      }

      if (currentLineState === null) {
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
      const isCorrectLine = foundBusStop
        ? currentLineState.line?.stops.includes(foundBusStop)
        : false;

      const currentBusStop =
        isStopSpeed && isGoodAngle && foundBusStop && isCorrectLine
          ? foundBusStop
          : null;

      setCurrentLineState({
        ...currentLineState,
        stop: currentBusStop,
      });
    });
  });
}
