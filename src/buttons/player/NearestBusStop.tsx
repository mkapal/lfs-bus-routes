import { useAtomValue } from "jotai";
import { Button } from "react-node-insim";

import { busStopProximityAtom } from "@/modules/bus/routes/busStopProximityAtom";
import { FullWidthFlex } from "@/shared/buttons/FullWidthFlex";

export function NearestBusStop() {
  const nearestBusStop = useAtomValue(busStopProximityAtom);

  if (!nearestBusStop) {
    return null;
  }

  return (
    <FullWidthFlex top={10} direction="column" alignItems="center">
      <Button variant="dark" width={50} height={10}>
        {nearestBusStop.name}
      </Button>
    </FullWidthFlex>
  );
}
