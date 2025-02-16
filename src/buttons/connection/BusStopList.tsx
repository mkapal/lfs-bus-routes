import { useAtomValue } from "jotai/index";
import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { BusStopDetail } from "@/buttons/connection/BusStopDetail";
import { BusStopPassengers } from "@/buttons/connection/BusStopPassengers";
import { type BusStop } from "@/modules/busStops/database/busStops";
import { busStopPassengersAtom } from "@/modules/busStops/passengers/busStopPassengersAtom";

export function BusStopList() {
  const [busStopDetail, setBusStopDetail] = useState<{
    busStop: BusStop | null;
  }>({
    busStop: null,
  });
  const busStopPassengers = useAtomValue(busStopPassengersAtom);

  return (
    <>
      <Button
        top={25}
        left={60}
        width={25}
        height={5}
        color="title"
        align="left"
      >
        Name
      </Button>
      <VStack top={30} left={60} width={25} height={5} variant="light">
        {Array.from(busStopPassengers.entries())
          .toSorted(([a], [b]) => a.name.localeCompare(b.name))
          .map(([busStop]) => (
            <ToggleButton
              isOn={busStopDetail.busStop === busStop}
              onToggle={(value) =>
                setBusStopDetail({
                  ...busStopDetail,
                  busStop: value ? busStop : null,
                })
              }
              key={busStop.id}
              align="left"
            >
              {busStop.name}
            </ToggleButton>
          ))}
      </VStack>
      <Button
        top={25}
        left={85}
        width={13}
        height={5}
        color="title"
        align="right"
      >
        Passengers
      </Button>
      <VStack top={30} left={85} width={13} height={5} variant="dark">
        {Array.from(busStopPassengers.entries()).map(
          ([busStop, passengers]) => (
            <Button key={busStop.id} align="right">
              {passengers.length}
            </Button>
          ),
        )}
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
