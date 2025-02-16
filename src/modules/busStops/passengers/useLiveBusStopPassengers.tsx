import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { type BusStop, busStops } from "@/modules/busStops/busStops";
import {
  busStopPassengersAtom,
  type Passenger,
} from "@/modules/busStops/passengers/busStopPassengersAtom";

let nextPassengerId = 0;

export function useLiveBusStopPassengers() {
  const setPassengers = useSetAtom(busStopPassengersAtom);

  useEffect(() => {
    const initialPassengers = busStops.map<[BusStop, Passenger[]]>(
      (busStop) => [busStop, [] as Passenger[]],
    );

    setPassengers(new Map(initialPassengers));

    const PASSENGER_ADD_INTERVAL = 2000;

    const interval = setInterval(() => {
      setPassengers((prevValue) => {
        const newMap = Array.from(new Map(prevValue).entries()).map<
          [BusStop, Passenger[]]
        >((prevEntry) => {
          const [busStop, passengers] = prevEntry;

          const otherBusStops = busStops.filter(({ id }) => busStop.id !== id);
          const randomId = Math.round(
            Math.random() * (otherBusStops.length - 1),
          );

          // TODO destination must be only in direction of the lines leaving from the station
          const randomDestination = otherBusStops[randomId];

          if (busStop.capacity <= passengers.length || !randomDestination) {
            return prevEntry;
          }

          const newPassengers: Passenger[] = [
            ...passengers,
            {
              id: ++nextPassengerId,
              destination: randomDestination,
            },
          ];

          return [busStop, newPassengers];
        });

        return new Map(newMap);
      });
    }, PASSENGER_ADD_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);
}
