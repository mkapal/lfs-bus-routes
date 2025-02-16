import { useState } from "react";
import { ToggleButton } from "react-node-insim";

import { BusRouteList } from "@/buttons/connection/BusRouteList";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function BusRoutes() {
  const [isRouteListOpen, setIsRouteListOpen] = useState(false);

  return (
    <HideButtonsInAutocrossEditor>
      <ToggleButton
        top={top}
        left={130}
        width={10}
        height={5}
        isOn={isRouteListOpen}
        onToggle={setIsRouteListOpen}
        variant="light"
      >
        Routes
      </ToggleButton>
      {isRouteListOpen && <BusRouteList />}
    </HideButtonsInAutocrossEditor>
  );
}
