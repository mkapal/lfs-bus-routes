import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { BusLineDetail } from "@/buttons/connection/BusLineDetail";
import { type BusLine, busLines } from "@/modules/bus/database/busLines";

const top = 25;
const left = 60;

export function BusLineList() {
  const [busLineDetail, setBusLineDetail] = useState<{
    busLine: BusLine | null;
  }>({
    busLine: null,
  });

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
        {busLines.map((busLine) => (
          <Button align="right" key={busLine.id}>
            {busLine.id}
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
        {busLines.map((busLine) => (
          <ToggleButton
            key={busLine.id}
            isOn={busLineDetail.busLine === busLine}
            onToggle={(value) =>
              setBusLineDetail({
                ...busLineDetail,
                busLine: value ? busLine : null,
              })
            }
            align="left"
          >
            {busLine.name}
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
        {busLines.map((busLine) => (
          <Button key={busLine.id} align="right">
            {busLine.stops.length}
          </Button>
        ))}
      </VStack>
      {busLineDetail.busLine && (
        <BusLineDetail busLine={busLineDetail.busLine} />
      )}
    </>
  );
}
