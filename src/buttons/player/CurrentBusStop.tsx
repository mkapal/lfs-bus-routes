import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { FullWidthFlex } from "@/shared/buttons/FullWidthFlex";

export function CurrentBusStop() {
  const currentBusRouteState = useAtomValue(currentBusRouteStateAtom);
  const progress = useAtomValue(busStopBoardingProgressAtom);

  if (!currentBusRouteState || !currentBusRouteState.stop || !progress) {
    return null;
  }

  return (
    <FullWidthFlex top={20} direction="column" alignItems="center">
      <Button left={120} width={30} height={5} variant="dark">
        Boarding: {progress}
      </Button>
    </FullWidthFlex>
  );
}
