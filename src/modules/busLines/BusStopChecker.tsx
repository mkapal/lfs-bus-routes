import { useRealPlayerContext } from "@/global/RealPlayerContext";
import { useBusStateContext } from "@/modules/busLines/BusStateProvider";

export function BusStopChecker() {
  const { busStateByPlayerId } = useBusStateContext();
  const { realPlayer } = useRealPlayerContext();

  return null;
}
