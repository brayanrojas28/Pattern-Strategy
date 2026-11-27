import { StrategyRegistry } from '../../shared/strategy-registry';
import type { PricingResult } from './pricing.types';
import { BlackFridayPricingStrategy } from './strategies/black-friday-pricing.strategy';
import { ExpressPricingStrategy } from './strategies/express-pricing.strategy';
import { LoyaltyPricingStrategy } from './strategies/loyalty-pricing.strategy';
import { StandardPricingStrategy } from './strategies/standard-pricing.strategy';

export function createPricingRegistry(): StrategyRegistry<number, PricingResult> {
  return new StrategyRegistry<number, PricingResult>()
    .register('standard', new StandardPricingStrategy())
    .register('express', new ExpressPricingStrategy())
    .register('black-friday', new BlackFridayPricingStrategy())
    .register('loyalty', new LoyaltyPricingStrategy());
}
