import { Button } from "react-node-insim";

import { busStops } from "@/modules/busLines/busStops";
import { useBusStop } from "@/modules/busStop/useBusStop";
import { useConnectionScope } from "@/scopes/connectionScope";

export function BusStop() {
  const { UCID } = useConnectionScope();
  const busStop = useBusStop.get();

  if (!busStop) {
    return null;
  }

  return (
    <Button variant="dark" top={0} left={100} width={30} height={5} UCID={UCID}>
      {busStops.find(({ id }) => id === busStop)?.name}
    </Button>
  );
}
