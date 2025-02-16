import { atom } from "jotai";

import { type BusRoute } from "@/modules/bus/database/busRoutes";

export const busRoutesAtom = atom<BusRoute[]>([]);
