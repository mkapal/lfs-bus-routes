import { ScopeProvider } from "jotai-scope";
import { type ReactNode } from "react";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { useBusStopBoardingProgress } from "@/modules/bus/boarding/useBusStopBoardingProgress";
import { busStopProximityAtom } from "@/modules/bus/routes/busStopProximityAtom";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { useBusStopProximity } from "@/modules/bus/routes/useBusStopProximity";
import { useCurrentBusStopDetector } from "@/modules/bus/routes/useCurrentBusStopDetector";

type BusStopModuleProps = {
  children: ReactNode;
};

export function BusModule({ children }: BusStopModuleProps) {
  return (
    <ScopeProvider
      atoms={[
        busStopProximityAtom,
        currentBusRouteStateAtom,
        busStopBoardingProgressAtom,
      ]}
    >
      <BusHooks />
      {children}
    </ScopeProvider>
  );
}

function BusHooks() {
  useBusStopProximity();
  useCurrentBusStopDetector();
  useBusStopBoardingProgress();

  return null;
}
