import { useLiveBusStopPassengers } from "@/modules/bus/passengers/useLiveBusStopPassengers";
import { useBusRoutes } from "@/modules/bus/routes/useBusRoutes";
import { useDevCommands } from "@/modules/commands/useDevCommands";
import { useMultiCarInfoCollector } from "@/shared/useMultiCarInfo";

export function GlobalModules() {
  useDevCommands();
  useMultiCarInfoCollector();
  useLiveBusStopPassengers();
  useBusRoutes();

  return null;
}
