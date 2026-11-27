import { roundToCents } from '../../../shared/money';
import type { PricingResult, PricingStrategy } from '../pricing.types';

/** ROLE: Concrete Strategy. No discount, flat standard shipping. */
export class StandardPricingStrategy implements PricingStrategy {
  readonly label = 'Standard';

  private readonly shipping = 5;

  execute(subtotal: number): PricingResult {
    return {
      subtotal,
      discount: 0,
      shipping: this.shipping,
      total: roundToCents(subtotal + this.shipping),
    };
  }
}
