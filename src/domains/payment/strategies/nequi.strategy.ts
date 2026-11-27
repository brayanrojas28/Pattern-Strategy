import { roundToCents } from '../../../shared/money';
import type { PaymentResult, PaymentStrategy } from '../payment.types';

/** ROLE: Concrete Strategy. Nequi (a Colombian digital wallet) charges no fee. */
export class NequiStrategy implements PaymentStrategy {
  readonly label = 'Nequi';

  execute(amount: number): PaymentResult {
    return { fee: 0, total: roundToCents(amount) };
  }
}
