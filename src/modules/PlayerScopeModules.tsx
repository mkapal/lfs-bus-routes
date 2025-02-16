import { CurrentBusStop } from "@/buttons/player/CurrentBusStop";
import { BusStopModule } from "@/modules/busStops/BusStopModule";

export function PlayerScopeModules() {
  return (
    <>
      <BusStopModule>
        <CurrentBusStop />
      </BusStopModule>
      {/*<PlayerCarInfo />*/}
    </>
  );
}
