import { atom } from "jotai";

import { type BusStop } from "@/modules/bus/database/busStops";

export type Passenger = {
  id: number;
  destination: BusStop;
};

export type BusStopPassengers = Map<BusStop, Passenger[]>;

export const busStopPassengersAtom = atom<BusStopPassengers>(new Map());
