import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { BusRouteDetail } from "@/buttons/connection/BusRouteDetail";
import { type BusRoute, busRoutes } from "@/modules/bus/database/busRoutes";

const top = 25;
const left = 60;

export function BusRouteList() {
  const [selectedBusRoute, setSelectedBusRoute] = useState<BusRoute | null>(
    null,
  );

  return (
    <>
      <Button
        top={top}
        left={left}
        width={5}
        height={5}
        color="title"
        align="left"
      >
        ID
      </Button>
      <VStack top={top + 5} left={left} width={5} height={5} variant="dark">
        {busRoutes.map((busRoute) => (
          <Button align="right" key={busRoute.id}>
            {busRoute.id}
          </Button>
        ))}
      </VStack>
      <Button
        top={top}
        left={left + 5}
        width={25}
        height={5}
        color="title"
        align="left"
      >
        Name
      </Button>
      <VStack
        top={top + 5}
        left={left + 5}
        width={25}
        height={5}
        variant="light"
      >
        {busRoutes.map((busRoute) => (
          <ToggleButton
            key={busRoute.id}
            isOn={selectedBusRoute === busRoute}
            onToggle={(value) => setSelectedBusRoute(value ? busRoute : null)}
            align="left"
          >
            {busRoute.name}
          </ToggleButton>
        ))}
      </VStack>
      <Button
        top={top}
        left={left + 30}
        width={8}
        height={5}
        color="title"
        align="right"
      >
        Stops
      </Button>
      <VStack
        top={top + 5}
        left={left + 30}
        width={8}
        height={5}
        variant="dark"
      >
        {busRoutes.map((busRoute) => (
          <Button key={busRoute.id} align="right">
            {busRoute.stops.length}
          </Button>
        ))}
      </VStack>
      {selectedBusRoute && <BusRouteDetail busRoute={selectedBusRoute} />}
    </>
  );
}
