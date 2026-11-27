import type { IPaymentStrategy } from "../core/payment.strategy";

export class NequiStrategy implements IPaymentStrategy {
  pay(amount: number): string {
    return `Pagando $${amount} con Nequi`;
  }
}