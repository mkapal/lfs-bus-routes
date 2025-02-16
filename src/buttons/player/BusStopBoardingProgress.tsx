import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStopBoardingProgressAtom } from "@/modules/busStops/boarding/busStopBoardingProgressAtom";

export function BusStopBoardingProgress() {
  const progress = useAtomValue(busStopBoardingProgressAtom);

  if (progress === null) {
    return null;
  }

  return (
    <Button top={5} left={120} width={30} height={5} variant="dark">
      Boarding: {progress}
    </Button>
  );
}
