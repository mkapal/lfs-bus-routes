import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { BusLineDetail } from "@/buttons/connection/BusLineDetail";
import { type BusLine, busLines } from "@/modules/bus/database/busLines";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function BusLineList() {
  const [busLineDetail, setBusLineDetail] = useState<{
    busLine: BusLine | null;
  }>({
    busLine: null,
  });
  const [isBusLineListOpen, setIsBusLineListOpen] = useState(false);

  return (
    <HideButtonsInAutocrossEditor>
      <ToggleButton
        top={top}
        left={130}
        width={10}
        height={5}
        isOn={isBusLineListOpen}
        onToggle={setIsBusLineListOpen}
        variant="light"
      >
        Lines
      </ToggleButton>
      {isBusLineListOpen && (
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
            {busLines.map((busLine) => (
              <Button align="right" key={busLine.id}>
                {busLine.id}
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
            top={25}
            left={90}
            width={8}
            height={5}
            color="title"
            align="right"
          >
            Stops
          </Button>
          <VStack top={30} left={90} width={8} height={5} variant="dark">
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
      )}
    </HideButtonsInAutocrossEditor>
  );
}
