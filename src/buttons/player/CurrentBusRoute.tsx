import { useAtom } from "jotai";
import { Button } from "react-node-insim";

import { BusRoutePicker } from "@/buttons/player/BusRoutePicker";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function CurrentBusRoute() {
  const [currentBusRouteState, setCurrentBusRouteState] = useAtom(
    currentBusRouteStateAtom,
  );

  if (!currentBusRouteState.route) {
    return <BusRoutePicker />;
  }

  return (
    <HideButtonsInAutocrossEditor>
      <Button
        top={top}
        left={50}
        width={25}
        height={5}
        variant="dark"
        align="left"
      >
        Route: {currentBusRouteState.route.name}
      </Button>
      <Button
        top={top}
        left={75}
        width={10}
        height={5}
        variant="light"
        color="yellow"
        onClick={() =>
          setCurrentBusRouteState({
            ...currentBusRouteState,
            route: null,
          })
        }
      >
        Cancel
      </Button>
    </HideButtonsInAutocrossEditor>
  );
}
