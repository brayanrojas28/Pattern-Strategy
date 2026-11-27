/** Rounds a money amount to 2 decimals (cents). */
export function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
