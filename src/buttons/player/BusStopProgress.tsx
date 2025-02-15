import { Button } from "react-node-insim";

import { useBusStopProgress } from "@/modules/busStop/useBusStopProgress";
import { usePlayerScope } from "@/scopes/playerScope";

export function BusStopProgress() {
  const player = usePlayerScope();
  const progress = useBusStopProgress.get();

  if (progress === null) {
    return null;
  }

  return (
    <Button
      UCID={player.UCID}
      top={5}
      left={100}
      width={30}
      height={5}
      variant="dark"
    >
      Progress: {progress}
    </Button>
  );
}
