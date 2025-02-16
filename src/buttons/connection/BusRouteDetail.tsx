import { Button, VStack } from "react-node-insim";

import { type BusRoute } from "@/modules/bus/database/busRoutes";

type BusRouteDetailProps = {
  busRoute: BusRoute;
};

const top = 25;
const left = 105;

export function BusRouteDetail({ busRoute }: BusRouteDetailProps) {
  return (
    <>
      <Button
        top={top}
        left={left}
        width={35}
        height={5}
        color="title"
        align="left"
      >
        Stops ({busRoute.stops.length})
      </Button>
      <VStack top={top + 5} left={left} width={5} height={5} variant="dark">
        {busRoute.stops.map((stop) => (
          <Button key={stop.id} align="right">
            {stop.id}
          </Button>
        ))}
      </VStack>
      <VStack
        top={top + 5}
        left={left + 5}
        width={20}
        height={5}
        variant="dark"
      >
        {busRoute.stops.map((stop) => (
          <Button key={stop.id} align="left">
            {stop.name}
          </Button>
        ))}
      </VStack>
    </>
  );
}
