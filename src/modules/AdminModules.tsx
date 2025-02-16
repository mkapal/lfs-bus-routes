import { useConnectionScope } from "react-node-insim";

import { BusLineList } from "@/buttons/connection/BusLineList";
import { BusStopList } from "@/buttons/connection/BusStopList";

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
