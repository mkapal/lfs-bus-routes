import { ScopeProvider } from "jotai-scope";
import { type ReactNode } from "react";

import { busStopBoardingProgressAtom } from "@/modules/busStops/boarding/busStopBoardingProgressAtom";
import { useBusStopBoardingProgress } from "@/modules/busStops/boarding/useBusStopBoardingProgress";
import { currentBusStopAtom } from "@/modules/busStops/stopDetection/currentBusStopAtom";
import { useCurrentBusStopDetector } from "@/modules/busStops/stopDetection/useCurrentBusStopDetector";

export function BusStopModule({ children }: { children: ReactNode }) {
  return (
    <ScopeProvider atoms={[currentBusStopAtom, busStopBoardingProgressAtom]}>
      <BusStopHooks />
      {children}
    </ScopeProvider>
  );
}

function BusStopHooks() {
  useCurrentBusStopDetector();
  useBusStopBoardingProgress();

  return null;
}
