import { useDevCommands } from "@/modules/commands/useDevCommands";
import { useMultiCarInfoCollector } from "@/shared/useMultiCarInfo";

export function GlobalModules() {
  useDevCommands();
  useMultiCarInfoCollector();

  return null;
}
