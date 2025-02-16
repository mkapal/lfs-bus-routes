import { atom } from "jotai";

import { type BusLine } from "@/modules/busStops/database/busLines";
import { type BusStop } from "@/modules/busStops/database/busStops";

export type Passenger = {
  id: number;
  line: BusLine;
  destination: BusStop;
};

export type BusStopPassengersAtom = Map<BusStop, Passenger[]>;

export const busStopPassengersAtom = atom<BusStopPassengersAtom>(new Map());
