import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MessageSound, PacketType } from "node-insim/packets";
import { useEffect, useRef } from "react";
import { useHumanPlayerScope, useOnPacket } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { busStopPassengersAtom } from "@/modules/bus/passengers/busStopPassengersAtom";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import lfsColor from "@/shared/lfsColor";
import { log } from "@/shared/log";

export function useBusStopBoardingProgress() {
  const player = useHumanPlayerScope();
  const [currentBusRouteState, setCurrentBusRouteState] = useAtom(
    currentBusRouteStateAtom,
  );
  const passengersByStop = useAtomValue(busStopPassengersAtom);
  const setBusStopProgress = useSetAtom(busStopBoardingProgressAtom);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const endProgress = () => {
    setBusStopProgress(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (!currentBusRouteState.route || !currentBusRouteState.stop) {
      endProgress();
      log(player.PName, "no route or stop exists");
      return;
    }

    const passengers = passengersByStop.get(currentBusRouteState.stop);

    if (!passengers) {
      log(player.PName, "no passengers");
      return;
    }

    log(player.PName, "initial progress");
    setBusStopProgress(0);

    intervalRef.current = setInterval(() => {
      log(player.PName, "update progress");
      setBusStopProgress((prevValue) =>
        prevValue === null ? 1 : prevValue + 1,
      );
    }, 1000);
    timeoutRef.current = setTimeout(
      () => {
        log(player.PName, "end progress");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setBusStopProgress(null);
      },
      (passengers.length + 1) * 1000,
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentBusRouteState.stop?.id, currentBusRouteState.route?.id]);

  useOnPacket(PacketType.ISP_PLL, (packet, inSim) => {
    if (packet.PLID === player.PLID) {
      log(player.PName, "trip cancelled");
      inSim.sendMessageToConnection(
        player.UCID,
        lfsColor.red("Bus route trip cancelled"),
        MessageSound.SND_ERROR,
      );
      endProgress();
      setCurrentBusRouteState((prev) => ({
        ...prev,
        route: null,
        stop: null,
      }));
    }
  });

  useOnPacket(PacketType.ISP_PLP, (packet, inSim) => {
    if (packet.PLID === player.PLID) {
      log(player.PName, "trip cancelled");
      inSim.sendMessageToPlayer(
        player.PLID,
        lfsColor.red("Bus route trip cancelled"),
        MessageSound.SND_ERROR,
      );
      endProgress();
      setCurrentBusRouteState((prev) => ({
        ...prev,
        route: null,
        stop: null,
      }));
    }
  });
}
