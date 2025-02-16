import { atom } from "jotai";

import { type BusRoute } from "@/modules/bus/database/busRoutes";
import { type BusStop } from "@/modules/bus/database/busStops";

export type CurrentRouteState = {
  route: BusRoute | null;
  stop: BusStop | null;
};

export const currentBusRouteStateAtom = atom<CurrentRouteState>({
  route: null,
  stop: null,
});
