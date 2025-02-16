import { useState } from "react";
import { ToggleButton } from "react-node-insim";

import { BusLineList } from "@/buttons/connection/BusLineList";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function Lines() {
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
      {isBusLineListOpen && <BusLineList />}
    </HideButtonsInAutocrossEditor>
  );
}
