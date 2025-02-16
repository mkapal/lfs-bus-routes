import { Button, VStack } from "react-node-insim";

import { type Passenger } from "@/modules/busStops/passengers/busStopPassengersAtom";

type BusStopPassengersProps = {
  passengers: Passenger[];
};

export function BusStopPassengers({ passengers }: BusStopPassengersProps) {
  return (
    <>
      <Button
        top={65}
        left={100}
        width={35}
        height={5}
        color="title"
        align="left"
      >
        Passengers in queue ({passengers.length})
      </Button>
      <VStack top={70} left={100} width={6} height={5} variant="dark">
        {passengers.map((passenger) => (
          <Button key={passenger.id} align="right">
            #{passenger.id}
          </Button>
        ))}
      </VStack>
      <VStack top={70} left={106} width={20} height={5} variant="dark">
        {passengers.map((passenger) => (
          <Button key={passenger.id} align="left">
            {passenger.line.name}
          </Button>
        ))}
      </VStack>
      <VStack top={70} left={126} width={25} height={5} variant="dark">
        {passengers.map((passenger) => (
          <Button key={passenger.id} align="left">
            {"->"} {passenger.destination.name}
          </Button>
        ))}
      </VStack>
    </>
  );
}
