import type { IPaymentStrategy } from '../core/payment.strategy';

export class PaypalStrategy implements IPaymentStrategy {
  pay(amount: number): string {
    return `Pagando $${amount} con PayPal`;
  }
}
