import { Button, VStack } from "react-node-insim";

import { useConnectionContext } from "@/global/ConnectionContext";
import { useMultiCarInfoContext } from "@/global/MultiCarInfoContext";
import { useRealPlayerContext } from "@/global/RealPlayerContext";

export function PlayerCarInfo() {
  const { connection } = useConnectionContext();
  const { multiCarInfo } = useMultiCarInfoContext();
  const { realPlayer } = useRealPlayerContext();

  const info = multiCarInfo[realPlayer.PLID];

  if (!info) {
    return null;
  }

  return (
    <VStack variant="light" top={0} left={125} width={20} height={5}>
      <Button UCID={connection.UCID}>X: {info.X ?? "?"}</Button>
      <Button UCID={connection.UCID}>Y: {info.Y ?? "?"}</Button>
      <Button UCID={connection.UCID}>Z: {info.Z ?? "?"}</Button>
      <Button UCID={connection.UCID}>Speed: {info.Speed ?? "?"}</Button>
      <Button UCID={connection.UCID}>Direction: {info.Direction ?? "?"}</Button>
      <Button UCID={connection.UCID}>Heading: {info.Heading ?? "?"}</Button>
      <Button UCID={connection.UCID}>AngVel: {info.AngVel ?? "?"}</Button>
    </VStack>
  );
}
