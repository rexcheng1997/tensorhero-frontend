const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

/**
 * Format UTC date string to "dd mm, yyyy"
 * @param {string} date UTC date string
 * @return {string}
 */
export default function formatDate(date: string): string {
  const dateObject = new Date(date);
  return [
    dateObject.getDate(),
    MONTHS[dateObject.getMonth()],
    dateObject.getFullYear(),
  ].join(' ');
};
