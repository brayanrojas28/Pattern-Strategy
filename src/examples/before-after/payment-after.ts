import { createPaymentRegistry } from '../../domains/payment/payment.registry';
import type { PaymentResult } from '../../domains/payment/payment.types';
import { Context } from '../../shared/context';

const registry = createPaymentRegistry();

/**
 * AFTER: the same function signature, but it no longer knows any payment method.
 * Each method's formula lives in its own class (see domains/payment/strategies).
 */
export function calculatePayment(method: string, amount: number): PaymentResult {
  return registry.get(method).execute(amount);
}

/**
 * Where the pattern really pays off: an object that keeps a Context and can
 * change its payment method at runtime without any branching.
 */
export class Checkout {
  private readonly payment: Context<number, PaymentResult>;

  constructor(method: string) {
    this.payment = new Context(registry.get(method));
  }

  changeMethod(method: string): void {
    this.payment.setStrategy(registry.get(method));
  }

  pay(amount: number): PaymentResult {
    return this.payment.execute(amount);
  }
}
