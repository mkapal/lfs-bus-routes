import { createContext, type ReactNode, useContext } from "react";
import { type Connection, useConnections } from "react-node-insim";

import { log as baseLog } from "@/shared/log";

type ConnectionContextType = {
  connection: Connection;
  log: (...args: unknown[]) => void;
};

const ConnectionContext = createContext<ConnectionContextType | null>(null);

type ConnectionContextProviderProps = {
  children: ReactNode;
  connection: Connection;
};

export function ConnectionContextProvider({
  children,
  connection,
}: ConnectionContextProviderProps) {
  const log = baseLog.extend(`connection:${connection.UCID}`);

  return (
    <ConnectionContext.Provider value={{ connection, log }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnectionContext() {
  const connectionContext = useContext(ConnectionContext);

  if (connectionContext === null) {
    throw new Error(
      "useConnectionContext hook must be called within <ConnectionContextProvider>",
    );
  }

  return connectionContext;
}

export type ButtonsByConnectionProps = {
  children: ReactNode;
};

export function ForEachConnection({ children }: ButtonsByConnectionProps) {
  const connections = useConnections();

  return connections.map((connection) => (
    <ConnectionContextProvider key={connection.UCID} connection={connection}>
      {children}
    </ConnectionContextProvider>
  ));
}
