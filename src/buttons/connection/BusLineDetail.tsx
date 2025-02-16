import { Button, VStack } from "react-node-insim";

import { type BusLine } from "@/modules/bus/database/busLines";

type BusLineDetailProps = {
  busLine: BusLine;
};

const top = 25;
const left = 105;

export function BusLineDetail({ busLine }: BusLineDetailProps) {
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
        Stops ({busLine.stops.length})
      </Button>
      <VStack top={top + 5} left={left} width={6} height={5} variant="dark">
        {busLine.stops.map((stop) => (
          <Button key={stop.id} align="right">
            {stop.id}
          </Button>
        ))}
      </VStack>
      <VStack
        top={top + 5}
        left={left + 6}
        width={20}
        height={5}
        variant="dark"
      >
        {busLine.stops.map((stop) => (
          <Button key={stop.id} align="left">
            {stop.name}
          </Button>
        ))}
      </VStack>
    </>
  );
}
