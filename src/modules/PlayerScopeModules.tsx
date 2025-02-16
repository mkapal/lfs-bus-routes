import { BusStopBoardingProgress } from "@/buttons/player/BusStopBoardingProgress";
import { CurrentBusStop } from "@/buttons/player/CurrentBusStop";
import { PlayerCarInfo } from "@/buttons/player/PlayerCarInfo";
import { BusStopModule } from "@/modules/busStops/BusStopModule";

export function PlayerScopeModules() {
  return (
    <>
      <BusStopModule>
        <CurrentBusStop />
        <BusStopBoardingProgress />
      </BusStopModule>
      {/*<PlayerCarInfo />*/}
    </>
  );
}
