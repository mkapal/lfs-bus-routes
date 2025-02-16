import { useEffect, useState } from "react";
import { Button, Flex, useConnectionScope } from "react-node-insim";

import { FullScreenFlex } from "@/shared/buttons/FullScreenFlex";
import { log } from "@/shared/log";
import { redis } from "@/shared/redis";

export function Welcome() {
  const connection = useConnectionScope();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    redis
      .hget(`lfsDrivingInSim:${connection.UName}`, "welcomeConfirmed")
      .then((hasConfirmed) => {
        log(connection.UName, "connection already confirmed");
        if (hasConfirmed !== "1") {
          setIsShown(true);
        }
      });
  }, []);

  const handleConfirm = async () => {
    log(connection.UName, "confirmed");
    await redis.hset(
      `lfsDrivingInSim:${connection.UName}`,
      "welcomeConfirmed",
      "1",
    );
    setIsShown(false);
  };

  if (!isShown) {
    return null;
  }

  return (
    <FullScreenFlex alignItems="center" justifyContent="center">
      <Flex
        top={0}
        left={0}
        width={100}
        height={80}
        direction="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="dark"
      >
        <Flex
          top={0}
          left={0}
          width={100}
          height={60}
          direction="column"
          justifyContent="center"
          alignItems="start"
          padding={4}
        >
          <Button width={92} height={10} color="title" align="left">
            City Bus Driving
          </Button>
          <Button width={92} height={6} align="left">
            This server is still in development. Some features are not fully
            working yet.
          </Button>
          <Button width={92} height={6} align="left">
            Features in progress:
          </Button>
          <Button width={92} height={6} align="left">
            - bus routes with stops
          </Button>
          <Button width={92} height={6} align="left">
            - traffic lights
          </Button>
          <Button width={92} height={6} align="left">
            - pedestrian crossings
          </Button>
          <Button width={92} height={6} align="left">
            - bus mass increase with passengers onboard
          </Button>
        </Flex>

        <Button
          width={10}
          height={8}
          color="ok"
          background="light"
          onClick={handleConfirm}
        >
          OK
        </Button>
      </Flex>
    </FullScreenFlex>
  );
}
