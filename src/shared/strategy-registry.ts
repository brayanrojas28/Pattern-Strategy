import type { Strategy } from './strategy';

/**
 * A lookup table of strategies by key (for example "card" -> CardStrategy).
 *
 * The registry replaces the `if (type === 'card') ... else if ...` chain:
 * callers ask for a key and get a strategy back. Adding a strategy means
 * registering it here, without touching the code that uses it.
 */
export class StrategyRegistry<TInput, TOutput> {
  private readonly strategies = new Map<string, Strategy<TInput, TOutput>>();

  register(key: string, strategy: Strategy<TInput, TOutput>): this {
    if (this.strategies.has(key)) {
      throw new Error(`A strategy is already registered with the key "${key}".`);
    }
    this.strategies.set(key, strategy);
    return this;
  }

  get(key: string): Strategy<TInput, TOutput> {
    const strategy = this.strategies.get(key);
    if (!strategy) {
      const known = this.keys().join(', ') || 'none';
      throw new Error(`Unknown strategy "${key}". Registered keys: ${known}.`);
    }
    return strategy;
  }

  has(key: string): boolean {
    return this.strategies.has(key);
  }

  /** Keys in registration order. */
  keys(): string[] {
    return [...this.strategies.keys()];
  }
}
