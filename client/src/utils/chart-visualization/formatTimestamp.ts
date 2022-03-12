/**
 * Format time into "mm:ss"
 * @param {number} time time in seconds
 * @return {string}
 */
export default function formatTimestamp(time: number): string {
  let seconds = Math.floor(time % 60).toString();
  if (seconds.length < 2) seconds = '0' + seconds;

  let minutes = Math.floor(time / 60).toString();
  if (minutes.length < 2) minutes = '0' + minutes;

  return minutes + ':' + seconds;
};
