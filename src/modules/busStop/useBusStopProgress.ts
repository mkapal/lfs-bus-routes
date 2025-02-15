import { molecule, use } from "bunshi";
import { useMolecule } from "bunshi/react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { PlayerScope } from "@/scopes/playerScope";

const busStopProgressMolecule = molecule(() => {
  use(PlayerScope);

  return atom<number | null>(null);
});

export const useBusStopProgress = {
  get: () => {
    return useAtomValue(useMolecule(busStopProgressMolecule));
  },
  set: () => {
    return useSetAtom(useMolecule(busStopProgressMolecule));
  },
  use: () => useAtom(useMolecule(busStopProgressMolecule)),
};
