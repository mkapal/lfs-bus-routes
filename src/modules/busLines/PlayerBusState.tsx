import { Button, VStack } from "react-node-insim";

import { useConnectionContext } from "@/global/ConnectionContext";
import { useRealPlayerContext } from "@/global/RealPlayerContext";
import { useBusStateContext } from "@/modules/busLines/BusStateProvider";
import { convertLfsAngleToDegrees } from "@/shared/lfsAngles";

export function PlayerBusState() {
  const { connection } = useConnectionContext();
  const { busStateByPlayerId } = useBusStateContext();
  const { realPlayer } = useRealPlayerContext();

  const busState = busStateByPlayerId[realPlayer.PLID];

  if (!busState) {
    return null;
  }

  return (
    <VStack
      background="dark"
      top={0}
      left={100}
      width={25}
      height={5}
      UCID={connection.UCID}
    >
      <Button color={busState.distanceToBusStop === null ? "green" : "red"}>
        {busState.distanceToBusStop === null ? "driving" : "stopped"}
      </Button>
      {busState.distanceToBusStop !== null ? (
        <Button variant="dark">
          {Math.round(busState.distanceToBusStop / 655.36)} cm
        </Button>
      ) : (
        <></>
      )}
      {busState.headingDelta !== null ? (
        <Button variant="dark">
          {Math.round(convertLfsAngleToDegrees(busState.headingDelta))} deg
        </Button>
      ) : (
        <></>
      )}
    </VStack>
  );
}
