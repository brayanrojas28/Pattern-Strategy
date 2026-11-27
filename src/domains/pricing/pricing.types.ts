import type { Strategy } from '../../shared/strategy';

/** Every checkout pricing rule returns the same shape, so they are interchangeable. */
export interface PricingResult {
  subtotal: number;
  discount: number;
  shipping: number;
  /** subtotal - discount + shipping */
  total: number;
}

/** ROLE: Strategy. Input: the cart subtotal. */
export interface PricingStrategy extends Strategy<number, PricingResult> {}
