import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import {
  Button,
  ToggleButton,
  useHumanPlayerScope,
  VStack,
} from "react-node-insim";

import { busRoutesAtom } from "@/modules/bus/routes/busRoutesAtom";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";
import { log } from "@/shared/log";

const top = 5;

export function BusRoutePicker() {
  const player = useHumanPlayerScope();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const setCurrentBusRouteState = useSetAtom(currentBusRouteStateAtom);
  const busRoutes = useAtomValue(busRoutesAtom);

  return (
    <HideButtonsInAutocrossEditor>
      <ToggleButton
        top={top}
        left={50}
        width={25}
        height={5}
        variant="light"
        isOn={isPickerOpen}
        onToggle={setIsPickerOpen}
      >
        Select a route
      </ToggleButton>
      {isPickerOpen && (
        <VStack top={top + 5} left={50} width={25} height={5} variant="dark">
          {busRoutes.map((busRoute) => (
            <Button
              key={busRoute.id}
              onClick={() => {
                log(
                  player.PName,
                  `selected route: ${busRoute.name} (${busRoute.id})`,
                );
                setCurrentBusRouteState((prevState) => ({
                  ...prevState,
                  route: busRoute,
                }));
              }}
            >
              {busRoute.name}
            </Button>
          ))}
        </VStack>
      )}
    </HideButtonsInAutocrossEditor>
  );
}
