import { ConnectionsPlayersProvider } from "react-node-insim";

import { ForEachConnection } from "@/global/ConnectionContext";
import { DevCommands } from "@/global/DevCommands";
import { MultiCarInfoProvider } from "@/global/MultiCarInfoContext";
import { ForRealPlayers } from "@/global/RealPlayerContext";
import { BusStopChecker } from "@/modules/busLines/BusStopChecker";
import { BusStopStateProvider } from "@/modules/busLines/BusStopStateProvider";
import { PlayerBusState } from "@/modules/busLines/PlayerBusState";
import { PlayerCarInfo } from "@/modules/player/PlayerCarInfo";
import { UserStatus } from "@/modules/userStatus/UserStatus";

export function App() {
  return (
    <ConnectionsPlayersProvider>
      <MultiCarInfoProvider>
        <DevCommands />
        <ForEachConnection>
          <UserStatus />
          <ForRealPlayers>
            <BusStopStateProvider>
              <BusStopChecker />
              <PlayerBusState />
              <PlayerCarInfo />
            </BusStopStateProvider>
          </ForRealPlayers>
        </ForEachConnection>
      </MultiCarInfoProvider>
    </ConnectionsPlayersProvider>
  );
}
