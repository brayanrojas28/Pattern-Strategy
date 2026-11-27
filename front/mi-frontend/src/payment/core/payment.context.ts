import type { IPaymentStrategy } from "./payment.strategy";

export class PaymentContext {
  private strategy: IPaymentStrategy;

  constructor(strategy: IPaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IPaymentStrategy) {
    this.strategy = strategy;
  }

  execute(amount: number): string {
    return this.strategy.pay(amount);
  }
}