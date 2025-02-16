import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MessageSound, PacketType } from "node-insim/packets";
import { useEffect, useRef } from "react";
import { useHumanPlayerScope, useOnPacket } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { busStopPassengersAtom } from "@/modules/bus/passengers/busStopPassengersAtom";
import lfsColor from "@/shared/lfsColor";

export function useBusStopBoardingProgress() {
  const player = useHumanPlayerScope();
  const [currentLineState, setCurrentLineState] = useAtom(currentLineStateAtom);
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
    if (!currentLineState.line || !currentLineState.stop) {
      endProgress();
      console.log("no line or stop");
      return;
    }

    const passengers = passengersByStop.get(currentLineState.stop);

    if (!passengers) {
      console.log("no passengers");
      return;
    }

    console.log("initial progress");
    setBusStopProgress(0);

    intervalRef.current = setInterval(() => {
      console.log("update progress");
      setBusStopProgress((prevValue) =>
        prevValue === null ? 1 : prevValue + 1,
      );
    }, 1000);
    timeoutRef.current = setTimeout(
      () => {
        console.log("end progress");
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
  }, [currentLineState.stop?.id, currentLineState.line?.id]);

  useOnPacket(PacketType.ISP_PLL, (packet, inSim) => {
    if (packet.PLID === player.PLID) {
      console.log("yes");
      inSim.sendMessageToConnection(
        player.UCID,
        lfsColor.red("Bus line trip cancelled"),
        MessageSound.SND_ERROR,
      );
      endProgress();
      setCurrentLineState((prev) => ({
        ...prev,
        line: null,
        stop: null,
      }));
    }
  });

  useOnPacket(PacketType.ISP_PLP, (packet, inSim) => {
    if (packet.PLID === player.PLID) {
      inSim.sendMessageToPlayer(
        player.PLID,
        lfsColor.red("Bus line trip cancelled"),
        MessageSound.SND_ERROR,
      );
      endProgress();
      setCurrentLineState((prev) => ({
        ...prev,
        line: null,
        stop: null,
      }));
    }
  });
}
