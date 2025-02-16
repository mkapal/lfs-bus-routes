import { useAtomValue } from "jotai";
import { useState } from "react";
import {
  Button,
  HStack,
  ToggleButton,
  useConnectionScope,
  VStack,
} from "react-node-insim";

import { type BusStop } from "@/modules/busStops/busStops";
import { busStopPassengersAtom } from "@/modules/busStops/passengers/busStopPassengersAtom";

export function TopBar() {
  const { UName } = useConnectionScope();
  const [isBusStopListOpen, setIsBusStopListOpen] = useState(false);
  const [busStopDetail, setBusStopDetail] = useState<BusStop | null>(null);
  const busStopPassengers = useAtomValue(busStopPassengersAtom);

  return (
    <>
      <HStack top={0} left={60} height={5} variant="dark">
        <Button width={25}>Welcome, {UName}</Button>
        <ToggleButton
          isOn={isBusStopListOpen}
          onToggle={setIsBusStopListOpen}
          width={22}
          variant="light"
        >
          Show bus stop stats
        </ToggleButton>
      </HStack>

      {isBusStopListOpen && (
        <>
          <Button
            top={35}
            left={80}
            width={25}
            height={5}
            color="title"
            align="left"
          >
            Name
          </Button>
          <VStack top={40} left={80} width={25} height={5} variant="dark">
            {Array.from(busStopPassengers.entries()).map(([busStop]) => (
              <ToggleButton
                isOn={busStopDetail === busStop}
                onToggle={(value) => setBusStopDetail(value ? busStop : null)}
                key={busStop.id}
                align="left"
              >
                {busStop.name}
              </ToggleButton>
            ))}
          </VStack>
          <Button
            top={35}
            left={105}
            width={10}
            height={5}
            color="title"
            align="right"
          >
            Capacity
          </Button>
          <VStack top={40} left={105} width={10} height={5} variant="dark">
            {Array.from(busStopPassengers.keys()).map((busStop) => {
              return (
                <Button key={busStop.id} align="right">
                  {busStop.capacity}
                </Button>
              );
            })}
          </VStack>
          <Button
            top={35}
            left={115}
            width={13}
            height={5}
            color="title"
            align="right"
          >
            Passengers
          </Button>
          <VStack top={40} left={115} width={13} height={5} variant="dark">
            {Array.from(busStopPassengers.entries()).map(
              ([busStop, passengers]) => (
                <Button key={busStop.id} align="right">
                  {passengers.length}
                </Button>
              ),
            )}
          </VStack>
        </>
      )}

      {busStopDetail && (
        <>
          <Button
            top={35}
            left={130}
            width={35}
            height={5}
            color="title"
            align="left"
          >
            {`Passengers at ${busStopDetail.name}`}
          </Button>
          <VStack top={40} left={130} width={5} height={5} variant="dark">
            {busStopPassengers.get(busStopDetail)?.map((passenger) => {
              return (
                <Button key={passenger.id} align="left">
                  {passenger.id}
                </Button>
              );
            }) ?? []}
          </VStack>
          <VStack top={40} left={135} width={25} height={5} variant="dark">
            {busStopPassengers.get(busStopDetail)?.map((passenger) => {
              return (
                <Button key={passenger.id} align="left">
                  {passenger.destination.name}
                </Button>
              );
            }) ?? []}
          </VStack>
        </>
      )}
    </>
  );
}
