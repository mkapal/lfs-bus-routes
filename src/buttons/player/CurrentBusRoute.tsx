import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { Button, type ButtonProps, Flex } from "react-node-insim";

import { BusRoutePicker } from "@/buttons/player/BusRoutePicker";
import { currentBusRouteStateAtom } from "@/modules/bus/routes/currentBusRouteStateAtom";

const top = 80;
const left = 169;

export function CurrentBusRoute() {
  const [currentBusRouteState, setCurrentBusRouteState] = useAtom(
    currentBusRouteStateAtom,
  );

  if (!currentBusRouteState.route) {
    return <BusRoutePicker top={top} left={left} />;
  }

  return (
    <>
      <Flex
        top={top}
        left={left}
        width={30}
        height={50}
        backgroundColor="light"
        padding={2}
        alignItems="start"
        direction="column"
      >
        <Button width={25} height={5} align="left" color="title">
          {currentBusRouteState.route.name}
        </Button>
        {
          currentBusRouteState.route.stops.toReversed().map((stop) => (
            <Button width={25} height={5} align="left" color="white">
              {stop.name}
            </Button>
          )) as unknown as ReactElement<ButtonProps>
        }
      </Flex>

      <Button
        top={top - 5}
        left={left + 20}
        width={10}
        height={5}
        variant="light"
        color="yellow"
        onClick={() =>
          setCurrentBusRouteState({
            ...currentBusRouteState,
            route: null,
          })
        }
      >
        Cancel
      </Button>
    </>
  );
}
