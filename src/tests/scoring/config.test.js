import { describe, expect, it } from 'vitest';
import { config } from '../../services/scoring/config.js';

describe('scoring config', () => {
  it('category weights sum to 100', () => {
    const sum = Object.values(config.weights).reduce((total, weight) => total + weight, 0);
    expect(sum).toBe(100);
  });

  it('every deduction references a real category, a positive penalty and a description', () => {
    for (const [id, deduction] of Object.entries(config.deductions)) {
      expect(config.weights, id).toHaveProperty(deduction.category);
      expect(deduction.penalty).toBeGreaterThan(0);
      expect(typeof deduction.description).toBe('string');
    }
  });

  it('is deeply frozen', () => {
    expect(Object.isFrozen(config)).toBe(true);
    expect(Object.isFrozen(config.thresholds)).toBe(true);
  });
});
