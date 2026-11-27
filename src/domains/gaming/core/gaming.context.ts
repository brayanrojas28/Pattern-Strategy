import type { IDifficultyStrategy } from './gaming.strategy';

export class GameContext {
  private strategy: IDifficultyStrategy;

  constructor(strategy: IDifficultyStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IDifficultyStrategy) {
    this.strategy = strategy;
  }

  execute(player: string): string {
    return this.strategy.play(player);
  }
}
