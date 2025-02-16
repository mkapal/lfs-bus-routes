import { type Track } from "@/shared/tracks";

export type BusStop = {
  id: number;
  track: Track;
  name: string;
  x: number;
  y: number;
  z: number;
  heading: number;
  capacity: number;
};

export const westhillBusStops: BusStop[] = [
  {
    id: 1,
    track: "WE",
    name: "Central 1",
    x: -11031097,
    y: 15502140,
    z: 351847,
    heading: 32768,
    capacity: 5,
  },
  {
    id: 2,
    track: "WE",
    name: "Central 2",
    x: -10978678,
    y: 12542524,
    z: 471164,
    heading: 32768,
    capacity: 14,
  },
  {
    id: 3,
    track: "WE",
    name: "Newbury South",
    x: -10872567,
    y: 8169656,
    z: 663697,
    heading: 32765,
    capacity: 12,
  },
  {
    id: 4,
    track: "WE",
    name: "Westlodge Hotel",
    x: -10178678,
    y: 12352524,
    z: 431364,
    heading: 31768,
    capacity: 20,
  },
];

export const busStops: BusStop[] = [...westhillBusStops];
