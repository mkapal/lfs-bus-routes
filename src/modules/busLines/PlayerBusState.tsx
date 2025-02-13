import { Button } from "react-node-insim";

import { useConnectionContext } from "@/global/ConnectionContext";
import { useBusStopState } from "@/modules/busLines/BusStopStateProvider";

export function PlayerBusState() {
  const { connection } = useConnectionContext();
  const { isStoppedAtBusStop } = useBusStopState();

  return (
    <Button
      color={isStoppedAtBusStop ? "red" : "green"}
      background="dark"
      top={0}
      left={100}
      width={25}
      height={5}
      UCID={connection.UCID}
    >
      {isStoppedAtBusStop ? "stopped" : "driving"}
    </Button>
  );
}
