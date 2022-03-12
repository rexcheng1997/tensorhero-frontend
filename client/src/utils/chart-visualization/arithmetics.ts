export const linear = (
    slope: number,
    offset: number,
) => (x: number) => slope * x + offset;

/**
 * Clips a value to a range specified by from and to
 * @param {number} value the value to be clipped
 * @param {number} from left boundary of the clip range
 * @param {number} to right boundary of the clip range
 * @return {number}
 */
export function clipBetween(
    value: number,
    from: number,
    to: number,
): number {
  if (from > to) {
    // eslint-disable-next-line max-len
    throw new Error(`clipBetween expects "from" (${from}) to be less than or equal to "to" (${to})`);
  }

  return Math.max(from, Math.min(to, value));
};
