import type { ITreatmentStrategy } from '../core/treatment.strategy';

export class TreatmentContext {
  private strategy: ITreatmentStrategy;

  constructor(strategy: ITreatmentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ITreatmentStrategy) {
    this.strategy = strategy;
  }

  execute(patient: string): string {
    return this.strategy.applyTreatment(patient);
  }
}