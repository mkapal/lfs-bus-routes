import { useAtomValue } from "jotai/index";
import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { BusStopDetail } from "@/buttons/connection/BusStopDetail";
import { BusStopPassengers } from "@/buttons/connection/BusStopPassengers";
import { type BusStop } from "@/modules/bus/database/busStops";
import { busStopPassengersAtom } from "@/modules/bus/passengers/busStopPassengersAtom";

const top = 25;
const left = 60;

export function BusStopList() {
  const [busStopDetail, setBusStopDetail] = useState<{
    busStop: BusStop | null;
  }>({
    busStop: null,
  });
  const busStopPassengers = useAtomValue(busStopPassengersAtom);
  const busStopEntries = Array.from(busStopPassengers.entries());

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
        {busStopEntries.map(([busStop]) => (
          <Button align="right" key={busStop.id}>
            {busStop.id}
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
        {busStopEntries
          .toSorted(([a], [b]) => a.name.localeCompare(b.name))
          .map(([busStop]) => (
            <ToggleButton
              key={busStop.id}
              isOn={busStopDetail.busStop === busStop}
              onToggle={(value) =>
                setBusStopDetail({
                  ...busStopDetail,
                  busStop: value ? busStop : null,
                })
              }
              align="left"
            >
              {busStop.name}
            </ToggleButton>
          ))}
      </VStack>
      <Button
        top={top}
        left={left + 30}
        width={10}
        height={5}
        color="title"
        align="right"
      >
        Queue
      </Button>
      <VStack
        top={top + 5}
        left={left + 30}
        width={10}
        height={5}
        variant="dark"
      >
        {busStopEntries.map(([busStop, passengers]) => (
          <Button key={busStop.id} align="right">
            {passengers.length}
          </Button>
        ))}
      </VStack>
      {busStopDetail.busStop && (
        <>
          <BusStopDetail busStop={busStopDetail.busStop} />
          <BusStopPassengers
            passengers={busStopPassengers.get(busStopDetail.busStop)!}
          />
        </>
      )}
    </>
  );
}
