/**
 * Join truthy class name values into a single space-separated string.
 * A dependency-free helper for composing conditional Tailwind classes.
 *
 * @param {...(string | false | null | undefined)} values - Class name fragments.
 * @returns {string} The combined class name string.
 */
export const cn = (...values) => values.filter(Boolean).join(' ');
