import { useEffect } from "react";

import { useBusStop } from "@/modules/busStop/useBusStop";
import { useBusStopProgress } from "@/modules/busStop/useBusStopProgress";

export function useBusStopProgressMonitor() {
  const busStop = useBusStop.get();
  const setBusStopProgress = useBusStopProgress.set();

  useEffect(() => {
    if (!busStop) {
      return;
    }

    setBusStopProgress(0);

    const interval = setInterval(() => {
      setBusStopProgress((prevValue) =>
        prevValue === null ? 1 : prevValue + 1,
      );
    }, 1000);
    const timeout = setTimeout(
      () => {
        clearInterval(interval);
        setBusStopProgress(null);
      },
      (10 + 1) * 1000,
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [busStop]);
}
