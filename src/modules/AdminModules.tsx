import { useConnectionScope } from "react-node-insim";

import { Lines } from "@/buttons/connection/Lines";
import { Stops } from "@/buttons/connection/Stops";

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
