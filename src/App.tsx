import { ConnectionsPlayersProvider } from "react-node-insim";

import { ConnectionScopeModules } from "@/modules/ConnectionScopeModules";
import { GlobalModules } from "@/modules/GlobalModules";
import { PlayerScopeModules } from "@/modules/PlayerScopeModules";
import { ConnectionScopeProvider } from "@/scopes/connectionScope";
import { PlayerScopeProvider } from "@/scopes/playerScope";

export function App() {
  return (
    <ConnectionsPlayersProvider>
      <GlobalModules />
      <ConnectionScopeProvider>
        <ConnectionScopeModules />
        <PlayerScopeProvider>
          <PlayerScopeModules />
        </PlayerScopeProvider>
      </ConnectionScopeProvider>
    </ConnectionsPlayersProvider>
  );
}
