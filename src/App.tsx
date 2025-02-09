import { ConnectionsProvider, PlayersProvider } from "react-node-insim";
import { ConnectionButton } from "@/components/ConnectionButton";
import { ButtonsForEachConnection } from "@/components/ButtonsForEachConnection";
import { TurnSignalChecker } from "@/modules/turnSignalChecker/TurnSignalChecker";

export function App() {
  return (
    <ConnectionsProvider>
      <PlayersProvider>
        <TurnSignalChecker />
        <ButtonsForEachConnection>
          <ConnectionButton left={40} top={40} width={30} height={8}>
            Welcome
          </ConnectionButton>
        </ButtonsForEachConnection>
      </PlayersProvider>
    </ConnectionsProvider>
  );
}
