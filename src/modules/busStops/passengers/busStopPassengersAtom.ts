import { atom } from "jotai";

import { type BusStop } from "@/modules/busStops/busStops";

export type Passenger = {
  id: number;
  destination: BusStop;
};

export type BusStopPassengersAtom = Map<BusStop, Passenger[]>;

export const busStopPassengersAtom = atom<BusStopPassengersAtom>(new Map());
