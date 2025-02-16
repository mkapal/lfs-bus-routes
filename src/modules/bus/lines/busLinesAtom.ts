import { atom } from "jotai";

import { type BusLine } from "@/modules/bus/database/busLines";

export const busLinesAtom = atom<BusLine[]>([]);
