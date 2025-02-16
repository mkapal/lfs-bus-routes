import {
  type BusStop,
  westhillBusStops,
} from "@/modules/bus/database/busStops";
import { type Track } from "@/shared/tracks";

export type BusLine = {
  id: number;
  track: Track;
  name: string;
  stops: BusStop[];
};

const westhillBusLines: BusLine[] = [
  {
    id: 1,
    track: "WE",
    name: "Short Line",
    stops: [westhillBusStops[0]!, westhillBusStops[2]!],
  },
];

export const busLines: BusLine[] = [...westhillBusLines];
