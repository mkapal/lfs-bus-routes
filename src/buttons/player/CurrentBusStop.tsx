import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { FullWidthFlex } from "@/shared/buttons/FullWidthFlex";

export function CurrentBusStop() {
  const currentBusRouteState = useAtomValue(currentBusRouteStateAtom);
  const progress = useAtomValue(busStopBoardingProgressAtom);

  if (!currentBusRouteState || !currentBusRouteState.stop) {
    return null;
  }

  return (
    <FullWidthFlex top={10} direction="column" alignItems="center">
      <Button variant="dark" width={50} height={10}>
        {currentBusRouteState.stop.name}
      </Button>
      {progress ? (
        <Button top={5} left={120} width={30} height={5} variant="dark">
          Boarding: {progress}
        </Button>
      ) : null}
    </FullWidthFlex>
  );
}
