import type { Strategy } from './strategy';

/**
 * ROLE: Context.
 *
 * Holds one strategy and delegates the work to it. The Context only knows
 * the Strategy interface, never a concrete class, which is why the
 * algorithm can be swapped at runtime with setStrategy().
 */
export class Context<TInput, TOutput> {
  private strategy: Strategy<TInput, TOutput>;

  constructor(strategy: Strategy<TInput, TOutput>) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy<TInput, TOutput>): void {
    this.strategy = strategy;
  }

  getStrategy(): Strategy<TInput, TOutput> {
    return this.strategy;
  }

  execute(input: TInput): TOutput {
    return this.strategy.execute(input);
  }
}
