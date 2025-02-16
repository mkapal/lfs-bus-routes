import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/bus/boarding/busStopBoardingProgressAtom";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { FullWidthFlex } from "@/shared/buttons/FullWidthFlex";

export function CurrentBusStop() {
  const currentLineState = useAtomValue(currentLineStateAtom);
  const progress = useAtomValue(busStopBoardingProgressAtom);

  if (!currentLineState || !currentLineState.stop) {
    return null;
  }

  return (
    <FullWidthFlex top={10} direction="column" alignItems="center">
      <Button variant="dark" width={50} height={10}>
        {currentLineState.stop.name}
      </Button>
      {progress ? (
        <Button top={5} left={120} width={30} height={5} variant="dark">
          Boarding: {progress}
        </Button>
      ) : null}
    </FullWidthFlex>
  );
}
