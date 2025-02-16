import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { busStopPassengersAtom } from "@/modules/bus/passengers/busStopPassengersAtom";

export function useBusStopBoardingProgress() {
  const currentLineState = useAtomValue(currentLineStateAtom);
  const passengersByStop = useAtomValue(busStopPassengersAtom);
  const setBusStopProgress = useSetAtom(busStopBoardingProgressAtom);

  useEffect(() => {
    if (!currentLineState || !currentLineState.stop) {
      setBusStopProgress(null);
      return;
    }

    const passengers = passengersByStop.get(currentLineState.stop);

    if (!passengers) {
      return;
    }

    setBusStopProgress(0);

    const interval = setInterval(() => {
      setBusStopProgress((prevValue) =>
        prevValue === null ? 1 : prevValue + 1,
      );
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setBusStopProgress(null);
    }, passengers.length * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentLineState?.stop]);
}
