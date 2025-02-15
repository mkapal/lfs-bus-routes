import { atom } from "jotai/index";

import { type BusStop } from "@/modules/busStops/busStops";

export const currentBusStopAtom = atom<BusStop["id"] | null>(null);
