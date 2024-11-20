import {
  ConnectionsProvider,
  PlayersProvider,
  useOnPacket,
  usePlayers,
} from "react-node-insim";
import { ConnectionButton } from "@/components/ConnectionButton";
import { ButtonsForEachConnection } from "@/components/ButtonsForEachConnection";
import { IS_MTC, PacketType } from "node-insim/packets";
import { log } from "@/utils/log";

export function App() {
  return (
    <ConnectionsProvider>
      <PlayersProvider>
        <TurnSignalChecker />
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
      </PlayersProvider>
    </ConnectionsProvider>
  );
}

function TurnSignalChecker() {
  const players = usePlayers();

  useOnPacket(PacketType.ISP_III, (packet, inSim) => {
    const args = packet.Msg.split(" ");

    if (packet.Msg.startsWith("DL_SIGNAL_L")) {
      const playerId = parseInt(args[1], 10);
      const player = players.get(playerId);

      if (!player) {
        return;
      }

      inSim.send(
        new IS_MTC({
          UCID: 255,
          Text: `${player.PName}^9 - Left signal ON`,
        }),
      );
    } else if (packet.Msg.startsWith("DL_SIGNAL_OFF")) {
      const playerId = parseInt(args[1], 10);
      const player = players.get(playerId);

      if (!player) {
        return;
      }

      inSim.send(
        new IS_MTC({
          UCID: 255,
          Text: `${player.PName}^9 - Left signal OFF`,
        }),
      );
    }
  });

  return null;
}
