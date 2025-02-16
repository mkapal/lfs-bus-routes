import { useSetAtom } from "jotai";
import { IS_TINY, PacketType, TinyType } from "node-insim/packets";
import { useState } from "react";
import { useOnConnect, useOnPacket } from "react-node-insim";

import { busLines } from "@/modules/bus/database/busLines";
import { busLinesAtom } from "@/modules/bus/lines/busLinesAtom";

export function useBusLines() {
  const [track, setTrack] = useState<string | null>(null);
  const setBusLines = useSetAtom(busLinesAtom);

  useOnConnect((_packet, inSim) => {
    inSim.send(
      new IS_TINY({
        ReqI: 1,
        SubT: TinyType.TINY_SST,
      }),
    );
  });

  useOnPacket(PacketType.ISP_STA, (packet) => {
    const newTrack = packet.Track.substring(0, 2);

    if (newTrack === track) {
      return;
    }

    const busLinesForCurrentTrack = busLines.filter(
      (line) => line.track === newTrack,
    );

    setTrack(newTrack);
    setBusLines(busLinesForCurrentTrack);
  });
}
