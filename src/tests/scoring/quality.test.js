import { describe, expect, it } from 'vitest';
import { scoreQuality } from '../../services/scoring/quality.js';

const ids = (result) => result.deductions.map((deduction) => deduction.id);

describe('scoreQuality', () => {
  it('penalizes zero stars and an absence of topics', () => {
    const result = scoreQuality({ stars: { total: 0 }, topics: { frequency: {} } });
    expect(ids(result)).toEqual(expect.arrayContaining(['ZERO_STARS', 'NO_TOPICS']));
  });

  it('rewards stars and topics', () => {
    const result = scoreQuality({ stars: { total: 42 }, topics: { frequency: { cli: 2 } } });
    expect(result.deductions).toEqual([]);
    expect(result.value).toBe(20);
  });
});
