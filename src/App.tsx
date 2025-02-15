import {
  ConnectionScopeProvider,
  ConnectionsPlayersProvider,
  HumanPlayerScopeProvider,
} from "react-node-insim";

import { ConnectionScopeModules } from "@/modules/ConnectionScopeModules";
import { GlobalModules } from "@/modules/GlobalModules";
import { PlayerScopeModules } from "@/modules/PlayerScopeModules";

export function App() {
  return (
    <ConnectionsPlayersProvider>
      <GlobalModules />
      <ConnectionScopeProvider>
        <ConnectionScopeModules />
        <HumanPlayerScopeProvider>
          <PlayerScopeModules />
        </HumanPlayerScopeProvider>
      </ConnectionScopeProvider>
    </ConnectionsPlayersProvider>
  );
}
