import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { busStopBoardingProgressAtom } from "@/modules/busStops/boarding/busStopBoardingProgressAtom";
import { busStopPassengersAtom } from "@/modules/busStops/passengers/busStopPassengersAtom";
import { currentBusStopAtom } from "@/modules/busStops/stopDetection/currentBusStopAtom";

export function useBusStopBoardingProgress() {
  const busStop = useAtomValue(currentBusStopAtom);
  const passengersByStop = useAtomValue(busStopPassengersAtom);
  const setBusStopProgress = useSetAtom(busStopBoardingProgressAtom);

  useEffect(() => {
    if (!busStop) {
      setBusStopProgress(null);
      return;
    }

    const passengers = passengersByStop.get(busStop);

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
  }, [busStop]);
}
