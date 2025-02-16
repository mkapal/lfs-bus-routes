import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStops } from "@/modules/busStops/busStops";
import { currentBusStopAtom } from "@/modules/busStops/stopDetection/currentBusStopAtom";

export function CurrentBusStop() {
  const currentBusStop = useAtomValue(currentBusStopAtom);

  if (!currentBusStop) {
    return null;
  }

  return (
    <Button variant="dark" top={0} left={120} width={30} height={5}>
      {busStops.find(({ id }) => id === currentBusStop)?.name}
    </Button>
  );
}
