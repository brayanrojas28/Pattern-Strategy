import { describe, expect, it } from 'vitest';
import { StrategyRegistry } from './strategy-registry';
import type { Strategy } from './strategy';

const upper: Strategy<string, string> = { label: 'Upper', execute: (s) => s.toUpperCase() };
const lower: Strategy<string, string> = { label: 'Lower', execute: (s) => s.toLowerCase() };

describe('StrategyRegistry', () => {
  it('returns the strategy registered under a key', () => {
    const registry = new StrategyRegistry<string, string>().register('upper', upper);

    expect(registry.get('upper')).toBe(upper);
    expect(registry.has('upper')).toBe(true);
    expect(registry.has('lower')).toBe(false);
  });

  it('lists keys in registration order', () => {
    const registry = new StrategyRegistry<string, string>()
      .register('upper', upper)
      .register('lower', lower);

    expect(registry.keys()).toEqual(['upper', 'lower']);
  });

  it('rejects duplicate keys', () => {
    const registry = new StrategyRegistry<string, string>().register('upper', upper);

    expect(() => registry.register('upper', lower)).toThrow(/already registered/);
  });

  it('explains which keys exist when a key is unknown', () => {
    const registry = new StrategyRegistry<string, string>().register('upper', upper);

    expect(() => registry.get('title')).toThrow(
      'Unknown strategy "title". Registered keys: upper.',
    );
  });
});
