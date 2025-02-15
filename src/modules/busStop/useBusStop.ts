import { molecule, use } from "bunshi";
import { useMolecule } from "bunshi/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atom } from "jotai/index";

import { type BusStop } from "@/modules/busLines/busStops";
import { PlayerScope } from "@/scopes/playerScope";

type BusStopAtom = BusStop["id"] | null;

const busStopMolecule = molecule(() => {
  use(PlayerScope);

  return atom<BusStopAtom>(null);
});

export const useBusStop = {
  get: () => {
    return useAtomValue(useMolecule(busStopMolecule));
  },
  set: () => {
    return useSetAtom(useMolecule(busStopMolecule));
  },
  use: () => useAtom(useMolecule(busStopMolecule)),
};
