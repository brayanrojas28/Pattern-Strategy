import { roundToCents } from '../../../shared/money';
import type { PricingResult, PricingStrategy } from '../pricing.types';

/** ROLE: Concrete Strategy. No discount, faster but more expensive shipping. */
export class ExpressPricingStrategy implements PricingStrategy {
  readonly label = 'Express';

  private readonly shipping = 15;

  execute(subtotal: number): PricingResult {
    return {
      subtotal,
      discount: 0,
      shipping: this.shipping,
      total: roundToCents(subtotal + this.shipping),
    };
  }
}
