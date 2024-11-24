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
          ></ConnectionButton>
        </ButtonsForEachConnection>
      </PlayersProvider>
    </ConnectionsProvider>
  );
}

function TurnSignalChecker() {
  const players = usePlayers();

  useOnPacket(PacketType.ISP_III, (packet, inSim) => {
    const args = packet.Msg.split(" ");

    switch (args[0]) {
      case "DL_SIGNAL_L": {
        const playerId = parseInt(args[1], 10);
        const player = players.get(playerId);

        if (!player) {
          return;
        }

        const text = `${player.PName}^9 - left signal ON`;
        log(text);
        inSim.send(
          new IS_MTC({
            UCID: 255,
            Text: text,
          }),
        );
        break;
      }

      case "DL_SIGNAL_R": {
        const playerId = parseInt(args[1], 10);
        const player = players.get(playerId);

        if (!player) {
          return;
        }

        const text = `${player.PName}^9 - right signal ON`;
        log(text);
        inSim.send(
          new IS_MTC({
            UCID: 255,
            Text: text,
          }),
        );
        break;
      }

      case "DL_SIGNAL_ALL": {
        const playerId = parseInt(args[1], 10);
        const player = players.get(playerId);

        if (!player) {
          return;
        }

        const text = `${player.PName}^9 - all signals ON`;
        log(text);
        inSim.send(
          new IS_MTC({
            UCID: 255,
            Text: text,
          }),
        );
        break;
      }

      case "DL_SIGNAL_OFF": {
        const playerId = parseInt(args[1], 10);
        const player = players.get(playerId);

        if (!player) {
          return;
        }

        const text = `${player.PName}^9 - signals OFF`;
        log(text);
        inSim.send(
          new IS_MTC({
            UCID: 255,
            Text: text,
          }),
        );
        break;
      }
    }
  });

  return null;
}
