import { atom } from "jotai/index";

import { type BusStop } from "@/modules/busStops/database/busStops";

export const currentBusStopAtom = atom<BusStop | null>(null);
