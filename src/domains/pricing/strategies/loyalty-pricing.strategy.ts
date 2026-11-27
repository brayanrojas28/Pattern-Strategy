import { roundToCents } from '../../../shared/money';
import type { PricingResult, PricingStrategy } from '../pricing.types';

/** ROLE: Concrete Strategy. Loyal customers get 10% off and free shipping. */
export class LoyaltyPricingStrategy implements PricingStrategy {
  readonly label = 'Loyalty (10% off, free shipping)';

  private readonly discountRate = 0.1;

  execute(subtotal: number): PricingResult {
    const discount = roundToCents(subtotal * this.discountRate);
    return {
      subtotal,
      discount,
      shipping: 0,
      total: roundToCents(subtotal - discount),
    };
  }
}
