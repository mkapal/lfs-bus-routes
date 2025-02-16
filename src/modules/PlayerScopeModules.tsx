import { CurrentBusStop } from "@/buttons/player/CurrentBusStop";
import { CurrentLine } from "@/buttons/player/CurrentLine";
import { BusLineModule } from "@/modules/bus/BusLineModule";

export function PlayerScopeModules() {
  return (
    <>
      <BusLineModule>
        <CurrentBusStop />
        <CurrentLine />
      </BusLineModule>
      {/*<PlayerCarInfo />*/}
    </>
  );
}
