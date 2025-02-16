import { atom } from "jotai";

import { type BusLine } from "@/modules/bus/database/busLines";
import { type BusStop } from "@/modules/bus/database/busStops";

export type CurrentLineState = {
  line: BusLine;
  stop: BusStop | null;
} | null;

export const currentLineStateAtom = atom<CurrentLineState>(null);
