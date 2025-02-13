export function convertLfsAngleToDegrees(value: number) {
  return (value / 32768) * 180;
}

export function convertDegreesToLfsAngle(value: number) {
  return (value / 180) * 32768;
}

export function convertLfsSpeedToMetersPerSecond(value: number) {
  return value / 3_276_800;
}

export function convertMetersToLfsCarPositionUnits(value: number) {
  return value * 65536;
}

export function convertLfsCarPositionUnitsToMeters(value: number) {
  return value / 65536;
}
