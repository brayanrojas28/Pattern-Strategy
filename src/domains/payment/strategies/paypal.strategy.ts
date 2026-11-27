import { roundToCents } from '../../../shared/money';
import type { PaymentResult, PaymentStrategy } from '../payment.types';

/** ROLE: Concrete Strategy. PayPal fee: 3.5% of the amount, no fixed fee. */
export class PaypalStrategy implements PaymentStrategy {
  readonly label = 'PayPal';

  private readonly percentage = 0.035;

  execute(amount: number): PaymentResult {
    const fee = roundToCents(amount * this.percentage);
    return { fee, total: roundToCents(amount + fee) };
  }
}
