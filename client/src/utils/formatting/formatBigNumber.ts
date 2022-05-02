/**
 * Formats the number relative to units (e.g. thousand, million, etc.)
 * @param {number} x the number to format
 * @return {string}
 */
export default function formatBigNumber(x: number): string {
  if (x < 1e3) return x.toString();
  if (x < 1e6) return (x / 1e3).toFixed(1) + 'k';
  if (x < 1e9) return (x / 1e6).toFixed(1) + 'm';
  return (x / 1e9).toFixed(1) + 'b';
};
