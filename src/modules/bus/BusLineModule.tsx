import { ScopeProvider } from "jotai-scope";
import { type ReactNode } from "react";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { useBusStopBoardingProgress } from "@/modules/bus/boarding/useBusStopBoardingProgress";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { useCurrentBusStopDetector } from "@/modules/bus/stopDetection/useCurrentBusStopDetector";

type BusStopModuleProps = {
  children: ReactNode;
};

export function BusLineModule({ children }: BusStopModuleProps) {
  return (
    <ScopeProvider atoms={[currentLineStateAtom, busStopBoardingProgressAtom]}>
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
