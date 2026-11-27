import { describe, expect, it } from 'vitest';
import { Checkout, calculatePayment as after } from './payment-after';
import { calculatePayment as before } from './payment-before';

describe('before/after refactoring', () => {
  const methods = ['card', 'paypal', 'nequi'];
  const amounts = [0, 1, 19.99, 100, 2500.5];

  // A refactor must not change behaviour: both versions give identical results.
  it.each(methods)('gives the same result for "%s"', (method) => {
    for (const amount of amounts) {
      expect(after(method, amount)).toEqual(before(method, amount));
    }
  });

  it('both versions reject unknown methods', () => {
    expect(() => before('bitcoin', 10)).toThrow();
    expect(() => after('bitcoin', 10)).toThrow();
  });

  it('Checkout swaps the payment method at runtime', () => {
    const checkout = new Checkout('card');
    expect(checkout.pay(100).total).toBe(103.2);

    checkout.changeMethod('nequi');

    expect(checkout.pay(100).total).toBe(100);
  });
});
