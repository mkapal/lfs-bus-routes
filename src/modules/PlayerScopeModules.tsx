import { PlayerButtons } from "@/buttons/PlayerButtons";
import { useBusStopDetector } from "@/modules/busStop/useBusStopDetector";
import { useBusStopProgressMonitor } from "@/modules/busStop/useBusStopProgressMonitor";

export function PlayerScopeModules() {
  useBusStopDetector();
  useBusStopProgressMonitor();

  return <PlayerButtons />;
}
