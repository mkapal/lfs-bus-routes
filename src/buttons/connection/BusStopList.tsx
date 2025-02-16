import { useAtomValue } from "jotai/index";
import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { BusStopDetail } from "@/buttons/connection/BusStopDetail";
import { BusStopPassengers } from "@/buttons/connection/BusStopPassengers";
import { type BusStop } from "@/modules/bus/database/busStops";
import { busStopPassengersAtom } from "@/modules/bus/passengers/busStopPassengersAtom";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function BusStopList() {
  const [busStopDetail, setBusStopDetail] = useState<{
    busStop: BusStop | null;
  }>({
    busStop: null,
  });
  const [isBusStopListOpen, setIsBusStopListOpen] = useState(false);
  const busStopPassengers = useAtomValue(busStopPassengersAtom);

  const busStopEntries = Array.from(busStopPassengers.entries());

  return (
    <HideButtonsInAutocrossEditor>
      <ToggleButton
        top={top}
        left={120}
        width={10}
        height={5}
        isOn={isBusStopListOpen}
        onToggle={setIsBusStopListOpen}
        variant="light"
      >
        Stops
      </ToggleButton>
      {isBusStopListOpen && (
        <>
          <Button
            top={25}
            left={60}
            width={5}
            height={5}
            color="title"
            align="left"
          >
            ID
          </Button>
          <VStack top={30} left={60} width={5} height={5} variant="dark">
            {busStopEntries.map(([busStop]) => (
              <Button align="right" key={busStop.id}>
                {busStop.id}
              </Button>
            ))}
          </VStack>
          <Button
            top={25}
            left={65}
            width={25}
            height={5}
            color="title"
            align="left"
          >
            Name
          </Button>
          <VStack top={30} left={65} width={25} height={5} variant="light">
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
            top={25}
            left={90}
            width={10}
            height={5}
            color="title"
            align="right"
          >
            Queue
          </Button>
          <VStack top={30} left={90} width={10} height={5} variant="dark">
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
      )}
    </HideButtonsInAutocrossEditor>
  );
}
