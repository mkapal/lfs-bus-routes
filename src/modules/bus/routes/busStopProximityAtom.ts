import { atom } from "jotai";

import { type BusStop } from "@/modules/bus/database/busStops";

export const busStopProximityAtom = atom<BusStop | null>(null);
