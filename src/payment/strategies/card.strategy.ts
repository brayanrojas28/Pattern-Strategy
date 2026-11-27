import type { IPaymentStrategy } from '../core/payment.strategy';

export class CardStrategy implements IPaymentStrategy {
  pay(amount: number): string {
    return `Pagando $${amount} con Tarjeta`;
  }
}
