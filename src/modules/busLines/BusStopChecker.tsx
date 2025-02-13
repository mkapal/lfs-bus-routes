import { useRealPlayerContext } from "@/global/RealPlayerContext";
import { useBusStopState } from "@/modules/busLines/BusStopStateProvider";

export function BusStopChecker() {
  const { isStoppedAtBusStop } = useBusStopState();
  const { realPlayer } = useRealPlayerContext();

  return null;
}
