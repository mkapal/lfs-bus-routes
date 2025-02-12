export type Coordinates3D = {
  x: number;
  y: number;
  z: number;
};

export function isWithinRadius({
  current,
  target,
  thresholds,
}: {
  current: Coordinates3D;
  target: Coordinates3D;
  thresholds: { xy: number; z: number };
}): boolean {
  const distanceXY = Math.sqrt(
    Math.pow(current.x - target.x, 2) + Math.pow(current.y - target.y, 2),
  );

  const deltaZ = Math.abs(current.z - target.z);

  return distanceXY <= thresholds.xy && deltaZ <= thresholds.z;
}

export function getDistance(pointA: Coordinates3D, pointB: Coordinates3D) {
  return Math.sqrt(
    Math.pow(pointA.x - pointB.x, 2) +
      Math.pow(pointA.y - pointB.y, 2) +
      (pointB.z - pointB.z),
  );
}
