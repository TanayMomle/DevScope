import '@testing-library/jest-dom';

// jsdom lacks ResizeObserver; provide a no-op so anything that touches it (e.g.
// a stray chart render) does not crash. Chart-heavy tests stub Recharts instead.
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
}
