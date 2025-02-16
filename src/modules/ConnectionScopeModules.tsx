import { BusLineList } from "@/buttons/connection/BusLineList";
import { BusStopList } from "@/buttons/connection/BusStopList";
import { Welcome } from "@/buttons/global/Welcome";

export function ConnectionScopeModules() {
  return (
    <>
      <Welcome />
      <BusStopList />
      <BusLineList />
    </>
  );
}
