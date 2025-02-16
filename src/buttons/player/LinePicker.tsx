import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { Button, ToggleButton, VStack } from "react-node-insim";

import { busLinesAtom } from "@/modules/bus/lines/busLinesAtom";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function LinePicker() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const setCurrentLineState = useSetAtom(currentLineStateAtom);
  const busLines = useAtomValue(busLinesAtom);

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
        Pick a line
      </ToggleButton>
      {isPickerOpen && (
        <VStack top={top + 5} left={50} width={25} height={5} variant="dark">
          {busLines.map((line) => (
            <Button
              key={line.id}
              onClick={() =>
                setCurrentLineState((prevState) => ({
                  ...prevState,
                  line,
                }))
              }
            >
              {line.name}
            </Button>
          ))}
        </VStack>
      )}
    </HideButtonsInAutocrossEditor>
  );
}
