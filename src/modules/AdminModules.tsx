import { useConnectionScope } from "react-node-insim";

import { BusRoutes } from "@/buttons/connection/BusRoutes";
import { BusStops } from "@/buttons/connection/BusStops";

export function AdminModules() {
  const connection = useConnectionScope();

  if (!connection.Admin) {
    return null;
  }

  return (
    <>
      {/*<BusStopList />*/}
      {/*<BusLineList />*/}
    </>
  );
}
