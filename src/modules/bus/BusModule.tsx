import { ScopeProvider } from "jotai-scope";
import { type ReactNode } from "react";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { useBusStopBoardingProgress } from "@/modules/bus/boarding/useBusStopBoardingProgress";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { useCurrentBusStopDetector } from "@/modules/bus/stopDetection/useCurrentBusStopDetector";

type BusStopModuleProps = {
  children: ReactNode;
};

export function BusModule({ children }: BusStopModuleProps) {
  return (
    <ScopeProvider
      atoms={[currentBusRouteStateAtom, busStopBoardingProgressAtom]}
    >
      <BusHooks />
      {children}
    </ScopeProvider>
  );
}

function BusHooks() {
  useCurrentBusStopDetector();
  useBusStopBoardingProgress();

  return null;
}
