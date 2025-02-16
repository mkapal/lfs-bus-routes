import { Button, VStack } from "react-node-insim";

import { type BusStop } from "@/modules/bus/database/busStops";
import { buildCopyPositionCommand } from "@/shared/commands";
import {
  convertDegreesToLfsAngle,
  convertLfsAngleToDegrees,
  convertMetersToLfsCarPositionUnits,
} from "@/shared/lfsUnits";

type BusStopDetailProps = {
  busStop: BusStop;
};

const top = 30;
const left = 105;

export function BusStopDetail({ busStop }: BusStopDetailProps) {
  return (
    <>
      <VStack top={top} left={left} width={12} height={5} variant="dark">
        <Button align="left">X</Button>
        <Button align="left">Y</Button>
        <Button align="left">Z</Button>
        <Button align="left">Heading</Button>
        <Button align="left">Capacity</Button>
      </VStack>
      <VStack top={top} left={left + 12} width={15} height={5} variant="dark">
        <Button align="left">{busStop.x}</Button>
        <Button align="left">{busStop.y}</Button>
        <Button align="left">{busStop.z}</Button>
        <Button align="left">{busStop.heading}</Button>
        <Button align="left">{busStop.capacity}</Button>
      </VStack>
      <Button top={top} left={left + 28} width={25} height={5} color="white">
        Copy position command:
      </Button>
      <Button
        top={top}
        left={left + 53}
        width={3}
        height={5}
        variant="light"
        initializeDialogWithButtonText
        caption="Go to Shift+U mode and paste this command into the chat"
        maxTypeInChars={95}
        onType={() => {
          // do nothing
        }}
      >
        {buildCopyPositionCommand({
          x: busStop.x,
          y: busStop.y,
          z: busStop.z + convertMetersToLfsCarPositionUnits(10),
          heading: convertDegreesToLfsAngle(
            convertLfsAngleToDegrees(busStop.heading) + 90,
          ),
          pitch: 16000,
          roll: 0.0,
          fov: 90,
        })}
      </Button>
    </>
  );
}
