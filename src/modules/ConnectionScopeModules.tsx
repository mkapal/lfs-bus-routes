import { BusRoutes } from "@/buttons/connection/BusRoutes";
import { BusStops } from "@/buttons/connection/BusStops";
import { Welcome } from "@/buttons/global/Welcome";

export function ConnectionScopeModules() {
  return (
    <>
      <Welcome />
      <BusStops />
      <BusRoutes />
    </>
  );
}
