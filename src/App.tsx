import { useEffect, useState } from "react";
import {
  ConnectionScopeProvider,
  ConnectionsPlayersProvider,
  GlobalScopeProvider,
  HumanPlayerScopeProvider,
} from "react-node-insim";

import { AdminModules } from "@/modules/AdminModules";
import { ConnectionScopeModules } from "@/modules/ConnectionScopeModules";
import { GlobalModules } from "@/modules/GlobalModules";
import { PlayerScopeModules } from "@/modules/PlayerScopeModules";
import { redis } from "@/shared/redis";

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    redis.on("connect", () => {
      setIsLoading(false);
      console.log("Redis connected");
    });
    redis.on("error", (err) => {
      console.log("Redis error", err);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ConnectionsPlayersProvider>
      <GlobalScopeProvider>
        <GlobalModules />
      </GlobalScopeProvider>
      <ConnectionScopeProvider>
        <ConnectionScopeModules />
        <AdminModules />
        <HumanPlayerScopeProvider>
          <PlayerScopeModules />
        </HumanPlayerScopeProvider>
      </ConnectionScopeProvider>
    </ConnectionsPlayersProvider>
  );
}
