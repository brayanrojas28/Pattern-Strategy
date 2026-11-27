import { describe, expect, it } from 'vitest';
import { createPricingRegistry } from './pricing.registry';
import { BlackFridayPricingStrategy } from './strategies/black-friday-pricing.strategy';
import { ExpressPricingStrategy } from './strategies/express-pricing.strategy';
import { LoyaltyPricingStrategy } from './strategies/loyalty-pricing.strategy';
import { StandardPricingStrategy } from './strategies/standard-pricing.strategy';

describe('pricing strategies', () => {
  it('StandardPricingStrategy adds flat shipping', () => {
    expect(new StandardPricingStrategy().execute(100)).toEqual({
      subtotal: 100,
      discount: 0,
      shipping: 5,
      total: 105,
    });
  });

  it('ExpressPricingStrategy adds higher shipping', () => {
    expect(new ExpressPricingStrategy().execute(100)).toEqual({
      subtotal: 100,
      discount: 0,
      shipping: 15,
      total: 115,
    });
  });

  it('BlackFridayPricingStrategy takes 30% off and keeps standard shipping', () => {
    expect(new BlackFridayPricingStrategy().execute(100)).toEqual({
      subtotal: 100,
      discount: 30,
      shipping: 5,
      total: 75,
    });
  });

  it('LoyaltyPricingStrategy takes 10% off with free shipping', () => {
    expect(new LoyaltyPricingStrategy().execute(100)).toEqual({
      subtotal: 100,
      discount: 10,
      shipping: 0,
      total: 90,
    });
  });

  it('rounds discounts to cents', () => {
    expect(new BlackFridayPricingStrategy().execute(19.99)).toEqual({
      subtotal: 19.99,
      discount: 6,
      shipping: 5,
      total: 18.99,
    });
  });
});

describe('pricing registry', () => {
  it('registers every pricing rule', () => {
    expect(createPricingRegistry().keys()).toEqual([
      'standard',
      'express',
      'black-friday',
      'loyalty',
    ]);
  });
});
