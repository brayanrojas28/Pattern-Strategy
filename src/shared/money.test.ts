import { describe, expect, it } from 'vitest';
import { roundToCents } from './money';

describe('roundToCents', () => {
  it('rounds to two decimals', () => {
    expect(roundToCents(2.345)).toBe(2.35);
    expect(roundToCents(1.005)).toBe(1.01);
    expect(roundToCents(10)).toBe(10);
  });
});
