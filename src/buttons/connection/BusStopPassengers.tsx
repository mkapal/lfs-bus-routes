import { Button, VStack } from "react-node-insim";

import { type Passenger } from "@/modules/bus/passengers/busStopPassengersAtom";

type BusStopPassengersProps = {
  passengers: Passenger[];
};

const top = 60;
const left = 105;

export function BusStopPassengers({ passengers }: BusStopPassengersProps) {
  return (
    <>
      <Button
        top={top}
        left={left}
        width={30}
        height={5}
        color="white"
        align="left"
      >
        Passengers in queue
      </Button>
      <Button
        top={top + 5}
        left={left}
        width={6}
        height={5}
        color="title"
        align="left"
      >
        ID
      </Button>
      <VStack top={top + 10} left={left} width={6} height={5} variant="dark">
        {passengers.map((passenger) => (
          <Button key={passenger.id} align="right">
            {passenger.id}
          </Button>
        ))}
      </VStack>
      <Button
        top={top + 5}
        left={left + 6}
        width={25}
        height={5}
        color="title"
        align="left"
      >
        Destination
      </Button>
      <VStack
        top={top + 10}
        left={left + 6}
        width={25}
        height={5}
        variant="dark"
      >
        {passengers.map((passenger) => (
          <Button key={passenger.id} align="left">
            {passenger.destination.name}
          </Button>
        ))}
      </VStack>
    </>
  );
}
