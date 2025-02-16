import { CurrentBusRoute } from "@/buttons/player/CurrentBusRoute";
import { CurrentBusStop } from "@/buttons/player/CurrentBusStop";
import { BusModule } from "@/modules/bus/BusModule";

export function PlayerScopeModules() {
  return (
    <>
      <BusModule>
        <CurrentBusStop />
        <CurrentBusRoute />
      </BusModule>
      {/*<PlayerCarInfo />*/}
    </>
  );
}
