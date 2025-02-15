export type BusStop = {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  heading: number;
};

export const busStops: BusStop[] = [
  {
    id: 1,
    name: "Central 1",
    x: -11031097,
    y: 15502140,
    z: 351847,
    heading: 32768,
  },
  {
    id: 2,
    name: "Central 2",
    x: -10978678,
    y: 12542524,
    z: 471164,
    heading: 32768,
  },
];
