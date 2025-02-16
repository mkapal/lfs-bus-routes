import { type BusStop, busStops } from "@/modules/busStops/database/busStops";

export type BusLine = {
  id: number;
  name: string;
  stops: BusStop[];
};

export const busLines: BusLine[] = [
  {
    id: 1,
    name: "Short Line",
    stops: [busStops[0]!, busStops[1]!, busStops[2]!],
  },
];
