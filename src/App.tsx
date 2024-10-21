import { GlobalProviders } from "./GlobalProviders";
import { ButtonsForEachConnection } from "@/components/ButtonsForEachConnection";
import { ConnectionButton } from "@/components/ConnectionButton";

export function App() {
  return (
    <GlobalProviders>
      <ButtonsForEachConnection>
        <ConnectionButton
          left={40}
          top={40}
          width={30}
          height={8}
          variant="dark"
        >
          test
        </ConnectionButton>
      </ButtonsForEachConnection>
    </GlobalProviders>
  );
}
