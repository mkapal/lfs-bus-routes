import { Button, VStack } from "react-node-insim";

import { useConnectionScope } from "@/scopes/connectionScope";
import { usePlayerScope } from "@/scopes/playerScope";
import { useMultiCarInfo } from "@/shared/useMultiCarInfo";

export function PlayerCarInfo() {
  const { UCID } = useConnectionScope();
  const player = usePlayerScope();
  const multiCarInfo = useMultiCarInfo();

  const info = multiCarInfo[player.PLID];

  if (!info) {
    return null;
  }

  return (
    <VStack variant="light" top={0} left={130} width={20} height={5}>
      <Button UCID={UCID}>X: {info.X ?? "?"}</Button>
      <Button UCID={UCID}>Y: {info.Y ?? "?"}</Button>
      <Button UCID={UCID}>Z: {info.Z ?? "?"}</Button>
      <Button UCID={UCID}>Speed: {info.Speed ?? "?"}</Button>
      <Button UCID={UCID}>Direction: {info.Direction ?? "?"}</Button>
      <Button UCID={UCID}>Heading: {info.Heading ?? "?"}</Button>
      <Button UCID={UCID}>AngVel: {info.AngVel ?? "?"}</Button>
    </VStack>
  );
}
