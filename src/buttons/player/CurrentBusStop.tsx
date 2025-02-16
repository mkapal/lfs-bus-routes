import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/busStops/boarding/busStopBoardingProgressAtom";
import { currentBusStopAtom } from "@/modules/busStops/stopDetection/currentBusStopAtom";
import { FullWidthFlex } from "@/shared/buttons/FullWidthFlex";

export function CurrentBusStop() {
  const currentBusStop = useAtomValue(currentBusStopAtom);
  const progress = useAtomValue(busStopBoardingProgressAtom);

  if (!currentBusStop) {
    return null;
  }

  return (
    <FullWidthFlex top={10} direction="column" alignItems="center">
      <Button variant="dark" width={50} height={10}>
        {currentBusStop.name}
      </Button>
      {progress ? (
        <Button top={5} left={120} width={30} height={5} variant="dark">
          Boarding: {progress}
        </Button>
      ) : null}
    </FullWidthFlex>
  );
}
