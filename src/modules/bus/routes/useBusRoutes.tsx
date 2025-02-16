import { useSetAtom } from "jotai";
import { IS_TINY, PacketType, TinyType } from "node-insim/packets";
import { useState } from "react";
import { useOnConnect, useOnPacket } from "react-node-insim";

import { busRoutes } from "@/modules/bus/database/busRoutes";
import { busRoutesAtom } from "@/modules/bus/routes/busRoutesAtom";

export function useBusRoutes() {
  const [track, setTrack] = useState<string | null>(null);
  const setBusRoutes = useSetAtom(busRoutesAtom);

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

    const busRoutesForCurrentTrack = busRoutes.filter(
      (busRoute) => busRoute.track === newTrack,
    );

    setTrack(newTrack);
    setBusRoutes(busRoutesForCurrentTrack);
  });
}
