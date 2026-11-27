import { roundToCents } from '../../../shared/money';
import type { PaymentResult, PaymentStrategy } from '../payment.types';

/** ROLE: Concrete Strategy. Card fee: 2.9% of the amount + a fixed 0.30. */
export class CardStrategy implements PaymentStrategy {
  readonly label = 'Credit card';

  private readonly percentage = 0.029;
  private readonly fixedFee = 0.3;

  execute(amount: number): PaymentResult {
    const fee = roundToCents(amount * this.percentage + this.fixedFee);
    return { fee, total: roundToCents(amount + fee) };
  }
}
