import { StrategyRegistry } from '../../shared/strategy-registry';
import type { PaymentResult } from './payment.types';
import { CardStrategy } from './strategies/card.strategy';
import { NequiStrategy } from './strategies/nequi.strategy';
import { PaypalStrategy } from './strategies/paypal.strategy';

/** The only place that lists the payment strategies. Register new ones here. */
export function createPaymentRegistry(): StrategyRegistry<number, PaymentResult> {
  return new StrategyRegistry<number, PaymentResult>()
    .register('card', new CardStrategy())
    .register('paypal', new PaypalStrategy())
    .register('nequi', new NequiStrategy());
}
