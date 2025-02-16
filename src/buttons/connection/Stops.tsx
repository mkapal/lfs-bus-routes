import { useState } from "react";
import { ToggleButton } from "react-node-insim";

import { BusStopList } from "@/buttons/connection/BusStopList";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function Stops() {
  const [isBusStopListOpen, setIsBusStopListOpen] = useState(false);

  return (
    <HideButtonsInAutocrossEditor>
      <ToggleButton
        top={top}
        left={120}
        width={10}
        height={5}
        isOn={isBusStopListOpen}
        onToggle={setIsBusStopListOpen}
        variant="light"
      >
        Stops
      </ToggleButton>
      {isBusStopListOpen && <BusStopList />}
    </HideButtonsInAutocrossEditor>
  );
}
