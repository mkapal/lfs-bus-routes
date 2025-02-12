import { PlayerType } from "node-insim/packets";
import { createContext, type ReactNode, useContext } from "react";
import { type Player, usePlayers } from "react-node-insim";

import { useConnectionContext } from "@/global/ConnectionContext";

type RealPlayerContextType = {
  realPlayer: Player;
};

const RealPlayerContext = createContext<RealPlayerContextType | null>(null);

type ForRealPlayersProps = {
  children: ReactNode;
};

export function ForRealPlayers({ children }: ForRealPlayersProps) {
  const { connection } = useConnectionContext();
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
    <RealPlayerContext.Provider value={{ realPlayer }}>
      {children}
    </RealPlayerContext.Provider>
  );
}

export function useRealPlayerContext() {
  const realPlayerContext = useContext(RealPlayerContext);

  if (realPlayerContext === null) {
    throw new Error(
      "useRealPlayerContext hook must be called within <RealPlayerContextProvider>",
    );
  }

  return realPlayerContext;
}
