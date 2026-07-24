const numberFormatter = new Intl.NumberFormat('en-US');
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

/**
 * Format a number with thousands separators.
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return numberFormatter.format(value);
}

/**
 * Format an ISO date string as a short, readable date.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  return dateFormatter.format(new Date(isoDate));
}
