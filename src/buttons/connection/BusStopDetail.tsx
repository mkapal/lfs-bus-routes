import { Button, VStack } from "react-node-insim";

import { type BusStop } from "@/modules/busStops/database/busStops";

type BusStopDetailProps = {
  busStop: BusStop;
};

export function BusStopDetail({ busStop }: BusStopDetailProps) {
  return (
    <>
      <VStack top={30} left={100} width={12} height={5} variant="dark">
        <Button align="left">ID</Button>
        <Button align="left">X</Button>
        <Button align="left">Y</Button>
        <Button align="left">Z</Button>
        <Button align="left">Heading</Button>
        <Button align="left">Capacity</Button>
      </VStack>
      <VStack top={30} left={112} width={15} height={5} variant="dark">
        <Button align="left">{busStop.id}</Button>
        <Button align="left">{busStop.x}</Button>
        <Button align="left">{busStop.y}</Button>
        <Button align="left">{busStop.z}</Button>
        <Button align="left">{busStop.heading}</Button>
        <Button align="left">{busStop.capacity}</Button>
      </VStack>
    </>
  );
}
