import { ConnectionsPlayersProvider } from "react-node-insim";

import { ForEachConnection } from "@/global/ConnectionContext";
import { DevCommands } from "@/global/DevCommands";
import { HideAllButtonsInSelectModes } from "@/global/HideAllButtonsInSelectModes";
import { MultiCarInfoProvider } from "@/global/MultiCarInfoContext";
import { ForRealPlayers } from "@/global/RealPlayerContext";
import { BusStateProvider } from "@/modules/busLines/BusStateProvider";
import { PlayerBusState } from "@/modules/busLines/PlayerBusState";
import { PlayerCarInfo } from "@/modules/player/PlayerCarInfo";
import { UserStatus } from "@/modules/userStatus/UserStatus";

export function App() {
  return (
    <ConnectionsPlayersProvider>
      <MultiCarInfoProvider>
        <DevCommands />
        <BusStateProvider>
          <HideAllButtonsInSelectModes>
            <ForEachConnection>
              <UserStatus />
              <ForRealPlayers>
                <PlayerBusState />
                <PlayerCarInfo />
              </ForRealPlayers>
            </ForEachConnection>
          </HideAllButtonsInSelectModes>
        </BusStateProvider>
      </MultiCarInfoProvider>
    </ConnectionsPlayersProvider>
  );
}
