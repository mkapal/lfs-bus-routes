import { useState } from "react";
import { HStack, ToggleButton } from "react-node-insim";

import { BusStopList } from "@/buttons/connection/BusStopList";

export function TopBar() {
  const [isBusStopListOpen, setIsBusStopListOpen] = useState(false);

  return (
    <>
      <HStack top={0} left={60} height={5} variant="dark">
        <ToggleButton
          isOn={isBusStopListOpen}
          onToggle={setIsBusStopListOpen}
          width={16}
          variant="light"
        >
          Bus stops
        </ToggleButton>
      </HStack>
      {isBusStopListOpen && <BusStopList />}
    </>
  );
}
