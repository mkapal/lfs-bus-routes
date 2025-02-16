export function buildCopyPositionCommand({
  x,
  y,
  z,
  heading,
  pitch,
  roll,
  fov,
}: {
  x: number;
  y: number;
  z: number;
  heading: number;
  pitch: number;
  roll: number;
  fov: number;
}) {
  return `/cp ${x} ${y} ${z} ${heading} ${pitch} ${roll} ${fov}`;
}
