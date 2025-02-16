import { useAtom } from "jotai";
import { Button } from "react-node-insim";

import { LinePicker } from "@/buttons/player/LinePicker";
import { currentLineStateAtom } from "@/modules/bus/lines/currentLineStateAtom";
import { HideButtonsInAutocrossEditor } from "@/shared/buttons/HideButtonsInAutocrossEditor";

const top = 5;

export function CurrentLine() {
  const [currentLineState, setCurrentLineState] = useAtom(currentLineStateAtom);

  if (!currentLineState.line) {
    return <LinePicker />;
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
        Line: {currentLineState.line.name}
      </Button>
      <Button
        top={top}
        left={75}
        width={10}
        height={5}
        variant="light"
        color="yellow"
        onClick={() =>
          setCurrentLineState({
            ...currentLineState,
            line: null,
          })
        }
      >
        Cancel
      </Button>
    </HideButtonsInAutocrossEditor>
  );
}
