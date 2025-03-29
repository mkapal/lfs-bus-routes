import { type InSim } from "node-insim";
import {
  IS_OCO,
  ObjectIndex,
  OCOAction,
  OCOAutocrossStartLights,
} from "node-insim/packets";
import { assign, createActor, createMachine } from "xstate";

type TrafficLightColor = "OFF__" | "STOP_" | "GO___" | "STOP*" | "GO*__";

export type TrafficLightController = {
  createIntersection: (
    ids: number[],
    phases: { time: number; states: TrafficLightColor[] }[],
  ) => void;
};

export function initialize(inSim: InSim): TrafficLightController {
  function createIntersection(
    ids: number[],
    phases: { time: number; states: TrafficLightColor[] }[],
  ) {
    const entries = phases.map((phase, index) => [
      `phase${index}`,
      {
        entry: assign({
          lights: () => setTrafficLights(ids, phase.states),
        }),
        after: {
          [phase.time * 1000]: `phase${(index + 1) % phases.length}`,
        },
      },
    ]);

    const trafficLightMachine = createMachine({
      initial: "phase0",
      context: {
        lights: setTrafficLights(
          ids,
          Array.from({ length: ids.length }, () => "STOP*"),
        ),
      },
      states: Object.fromEntries(entries),
    });

    const service = createActor(trafficLightMachine);

    service.subscribe((state) => {
      state.context.lights.forEach(({ id, color }) => {
        inSim.send(
          new IS_OCO({
            OCOAction: OCOAction.OCO_LIGHTS_SET,
            Index: ObjectIndex.AXO_START_LIGHTS,
            Identifier: id,
            Data:
              (color === "STOP_" || color === "GO*__"
                ? OCOAutocrossStartLights.RED
                : 0) |
              (color === "STOP*" || color === "GO*__"
                ? OCOAutocrossStartLights.AMBER
                : 0) |
              (color === "GO___" ? OCOAutocrossStartLights.GREEN : 0),
          }),
        );
      });
    });

    service.start();
  }

  return {
    createIntersection,
  };
}

function setTrafficLights(ids: number[], colorMap: TrafficLightColor[]) {
  return ids.map((id, index) => ({
    id,
    color: colorMap[index] || "STOP_",
  }));
}
