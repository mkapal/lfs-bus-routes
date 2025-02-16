import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { type BusStop, busStops } from "@/modules/bus/database/busStops";
import {
  busStopPassengersAtom,
  type Passenger,
} from "@/modules/bus/passengers/busStopPassengersAtom";

let nextPassengerId = 0;

export function useLiveBusStopPassengers() {
  const setPassengers = useSetAtom(busStopPassengersAtom);

  useEffect(() => {
    const initialPassengers = busStops.map<[BusStop, Passenger[]]>(
      (busStop) => [busStop, [] as Passenger[]],
    );

    setPassengers(new Map(initialPassengers));

    const PASSENGER_ADD_INTERVAL = 2_000;

    const interval = setInterval(() => {
      setPassengers((prevValue) => {
        const newMap = Array.from(new Map(prevValue).entries()).map<
          [BusStop, Passenger[]]
        >((prevEntry) => {
          const [busStop, passengers] = prevEntry;

          if (busStop.capacity <= passengers.length) {
            return prevEntry;
          }

          // TODO destination must be only in direction of the lines leaving from the station
          const otherBusStops = busStops.filter(({ id }) => busStop.id !== id);
          const randomDestinationId = Math.round(
            Math.random() * (otherBusStops.length - 1),
          );
          const randomDestination = otherBusStops[randomDestinationId];

          if (!randomDestination) {
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
