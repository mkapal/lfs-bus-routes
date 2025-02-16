import { useLiveBusStopPassengers } from "@/modules/busStops/passengers/useLiveBusStopPassengers";
import { useDevCommands } from "@/modules/commands/useDevCommands";
import { useMultiCarInfoCollector } from "@/shared/useMultiCarInfo";

export function GlobalModules() {
  useDevCommands();
  useMultiCarInfoCollector();
  useLiveBusStopPassengers();

  return null;
}
