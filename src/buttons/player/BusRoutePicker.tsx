import { useAtomValue, useSetAtom } from "jotai";
import { type ReactElement, useState } from "react";
import {
  Button,
  Flex,
  ToggleButton,
  useHumanPlayerScope,
} from "react-node-insim";

import { busRoutesAtom } from "@/modules/bus/routes/busRoutesAtom";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { log } from "@/shared/log";

interface BusRoutePickerProps {
  top: number;
  left: number;
}

export function BusRoutePicker({ top, left }: BusRoutePickerProps) {
  const player = useHumanPlayerScope();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const setCurrentBusRouteState = useSetAtom(currentBusRouteStateAtom);
  const busRoutes = useAtomValue(busRoutesAtom);

  const availableBusRoutes = isPickerOpen ? busRoutes : [];

  return (
    <Flex
      top={top}
      left={left}
      width={30}
      height={50}
      backgroundColor="light"
      padding={2}
      alignItems="start"
      direction="column"
    >
      <ToggleButton
        width={25}
        height={5}
        variant="light"
        isOn={isPickerOpen}
        onToggle={setIsPickerOpen}
      >
        Select a route
      </ToggleButton>
      {
        availableBusRoutes.map((busRoute) => (
          <Button
            key={busRoute.id}
            width={25}
            height={5}
            variant="light"
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
        )) as unknown as ReactElement
      }
    </Flex>
  );
}
