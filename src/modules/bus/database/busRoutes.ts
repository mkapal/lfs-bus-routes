import {
  type BusStop,
  westhillBusStops,
} from "@/modules/bus/database/busStops";
import { type Coordinates3D } from "@/shared/coordinates";
import { type Track } from "@/shared/tracks";

export type BusRoute = {
  id: number;
  track: Track;
  name: string;
  spawnPoint: Coordinates3D & {
    heading: number;
  };
  stops: BusStop[];
};

const westhillBusRoutes: BusRoute[] = [
  {
    id: 1,
    track: "WE",
    name: "Short Line",
    spawnPoint: {
      x: 1,
      y: 2,
      z: 3,
      heading: 1,
    },
    stops: [westhillBusStops[0]!, westhillBusStops[2]!],
  },
];

export const busRoutes: BusRoute[] = [...westhillBusRoutes];
