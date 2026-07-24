/**
 * Design tokens shared between Tailwind's theme and the application.
 * Keeping the palette here gives us a single source of truth for brand color,
 * consumed by `tailwind.config.js` and available to components when needed.
 */

/** Primary brand scale (blue). */
export const brand = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};

/** Neutral surfaces used for backgrounds and elevated panels. */
export const surface = {
  DEFAULT: '#0b1120',
  muted: '#111827',
  raised: '#1f2937',
};
