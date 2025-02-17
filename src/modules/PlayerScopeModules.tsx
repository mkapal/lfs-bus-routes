import { CurrentBusRoute } from "@/buttons/player/CurrentBusRoute";
import { CurrentBusStop } from "@/buttons/player/CurrentBusStop";
import { NearestBusStop } from "@/buttons/player/NearestBusStop";
import { BusModule } from "@/modules/bus/BusModule";

export function PlayerScopeModules() {
  return (
    <>
      <BusModule>
        <NearestBusStop />
        <CurrentBusStop />
        <CurrentBusRoute />
      </BusModule>
      {/*<PlayerCarInfo />*/}
    </>
  );
}
