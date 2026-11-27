import { roundToCents } from '../../../shared/money';
import type { PricingResult, PricingStrategy } from '../pricing.types';

/** ROLE: Concrete Strategy. 30% off the subtotal, standard shipping. */
export class BlackFridayPricingStrategy implements PricingStrategy {
  readonly label = 'Black Friday (30% off)';

  private readonly discountRate = 0.3;
  private readonly shipping = 5;

  execute(subtotal: number): PricingResult {
    const discount = roundToCents(subtotal * this.discountRate);
    return {
      subtotal,
      discount,
      shipping: this.shipping,
      total: roundToCents(subtotal - discount + this.shipping),
    };
  }
}
