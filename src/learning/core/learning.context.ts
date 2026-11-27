import type { ILearningStrategy } from "./learning.strategy";

export class LearningContext {
  private strategy: ILearningStrategy;

  constructor(strategy: ILearningStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ILearningStrategy) {
    this.strategy = strategy;
  }

  execute(material: string): string {
    return this.strategy.learn(material);
  }
}