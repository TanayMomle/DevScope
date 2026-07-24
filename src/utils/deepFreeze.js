/**
 * Recursively freeze a value the caller created. Only pass values built from
 * freshly-created objects/arrays and primitives — never shared inputs — since
 * freezing changes the object's extensibility.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}
