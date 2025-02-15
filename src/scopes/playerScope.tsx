import { createScope, molecule, use } from "bunshi";
import { ScopeProvider, useMolecule } from "bunshi/react";
import { atom, useAtomValue } from "jotai";
import { PlayerType } from "node-insim/packets";
import { type ReactNode } from "react";
import { type Player, usePlayers } from "react-node-insim";

import { useConnectionScope } from "@/scopes/connectionScope";

export const PlayerScope = createScope<Player>({} as Player);

export function PlayerScopeProvider({ children }: { children: ReactNode }) {
  const connection = useConnectionScope();
  const players = usePlayers();

  const realPlayer = Array.from(players.values()).find((player) => {
    return (
      player.UCID === connection.UCID &&
      (player.PType & PlayerType.REMOTE) > 0 &&
      (player.PType & PlayerType.AI) === 0
    );
  });

  if (!realPlayer) {
    return null;
  }

  return (
    <ScopeProvider scope={PlayerScope} value={realPlayer}>
      {children}
    </ScopeProvider>
  );
}

const playerMolecule = molecule((_, getScope) => {
  use(PlayerScope);

  const player = getScope(PlayerScope);

  return atom((get) => get(atom(player)));
});

export function usePlayerScope() {
  const usePlayerAtom = useMolecule(playerMolecule);

  return useAtomValue(usePlayerAtom);
}
