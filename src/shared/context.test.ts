import { describe, expect, it } from 'vitest';
import { Context } from './context';
import type { Strategy } from './strategy';

// A strategy does not have to be a class: any object with the right shape works.
const double: Strategy<number, number> = { label: 'Double', execute: (n) => n * 2 };
const square: Strategy<number, number> = { label: 'Square', execute: (n) => n * n };

describe('Context', () => {
  it('delegates the work to the current strategy', () => {
    const context = new Context(double);

    expect(context.execute(5)).toBe(10);
  });

  it('swaps the strategy at runtime with setStrategy()', () => {
    const context = new Context(double);

    context.setStrategy(square);

    expect(context.execute(5)).toBe(25);
    expect(context.getStrategy()).toBe(square);
  });
});
