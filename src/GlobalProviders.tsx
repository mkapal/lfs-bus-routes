import type { ReactNode } from "react";
import { ConnectionsProvider, PlayersProvider } from "react-node-insim";

export type ProvidersProps = {
  children: ReactNode;
};

export function GlobalProviders({ children }: ProvidersProps) {
  return (
    <ConnectionsProvider>
      <PlayersProvider>{children}</PlayersProvider>
    </ConnectionsProvider>
  );
}
