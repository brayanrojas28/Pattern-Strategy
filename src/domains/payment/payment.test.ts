import { describe, expect, it } from 'vitest';
import { Context } from '../../shared/context';
import { createPaymentRegistry } from './payment.registry';
import { CardStrategy } from './strategies/card.strategy';
import { NequiStrategy } from './strategies/nequi.strategy';
import { PaypalStrategy } from './strategies/paypal.strategy';

describe('payment strategies', () => {
  it('CardStrategy charges 2.9% + 0.30', () => {
    expect(new CardStrategy().execute(100)).toEqual({ fee: 3.2, total: 103.2 });
  });

  it('PaypalStrategy charges 3.5%', () => {
    expect(new PaypalStrategy().execute(100)).toEqual({ fee: 3.5, total: 103.5 });
  });

  it('NequiStrategy charges nothing', () => {
    expect(new NequiStrategy().execute(100)).toEqual({ fee: 0, total: 100 });
  });

  it('rounds fees to cents', () => {
    expect(new CardStrategy().execute(19.99)).toEqual({ fee: 0.88, total: 20.87 });
  });

  it('gives a different total for the same amount after swapping the strategy', () => {
    const registry = createPaymentRegistry();
    const context = new Context(registry.get('card'));
    expect(context.execute(50).total).toBe(51.75);

    context.setStrategy(registry.get('nequi'));

    expect(context.execute(50).total).toBe(50);
  });
});

describe('payment registry', () => {
  it('registers every payment strategy', () => {
    expect(createPaymentRegistry().keys()).toEqual(['card', 'paypal', 'nequi']);
  });
});
