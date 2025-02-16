import { useBusLines } from "@/modules/bus/lines/useBusLines";
import { useLiveBusStopPassengers } from "@/modules/bus/passengers/useLiveBusStopPassengers";
import { useDevCommands } from "@/modules/commands/useDevCommands";
import { useMultiCarInfoCollector } from "@/shared/useMultiCarInfo";

export function GlobalModules() {
  useDevCommands();
  useMultiCarInfoCollector();
  useLiveBusStopPassengers();
  useBusLines();

  return null;
}
