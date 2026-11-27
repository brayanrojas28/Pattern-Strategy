# Before and after: refactoring to Strategy

This page walks through one real refactor in this repo: payment fees. Both versions are in [`src/examples/before-after/`](../src/examples/before-after/), and [a test](../src/examples/before-after/before-after.test.ts) checks that they return the same results for every method.

## Side by side

<table>
<tr>
<th>Before: one function with if/else</th>
<th>After: one class per method</th>
</tr>
<tr>
<td valign="top">

```ts
function calculatePayment(method: string, amount: number) {
  let fee: number;

  if (method === 'card') {
    fee = roundToCents(amount * 0.029 + 0.3);
  } else if (method === 'paypal') {
    fee = roundToCents(amount * 0.035);
  } else if (method === 'nequi') {
    fee = 0;
  } else {
    throw new Error(`Unknown payment method "${method}".`);
  }

  return { fee, total: roundToCents(amount + fee) };
}
```

</td>
<td valign="top">

```ts
// One class per method (only one shown here)
class PaypalStrategy implements PaymentStrategy {
  readonly label = 'PayPal';
  private readonly percentage = 0.035;

  execute(amount: number): PaymentResult {
    const fee = roundToCents(amount * this.percentage);
    return { fee, total: roundToCents(amount + fee) };
  }
}

// One place that lists them
const registry = new StrategyRegistry<number, PaymentResult>()
  .register('card', new CardStrategy())
  .register('paypal', new PaypalStrategy())
  .register('nequi', new NequiStrategy());

// The caller no longer knows any method
function calculatePayment(method: string, amount: number) {
  return registry.get(method).execute(amount);
}
```

</td>
</tr>
</table>

## What improved

| Question                          | Before                                                                                   | After                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| How do I add Apple Pay?           | Edit `calculatePayment`, and every other `if (method === ...)` chain in the codebase.    | Create `ApplePayStrategy` and add one `register()` line. Nothing else changes. |
| Could I break PayPal by accident? | Yes. All the methods share one function, so a change to one branch can break the others. | Unlikely. The PayPal formula lives alone in `paypal.strategy.ts`.              |
| How do I test the card fee?       | Through the whole function, passing the string `'card'`.                                 | `new CardStrategy().execute(100)`: small, direct, independent.                 |
| Can I switch method at runtime?   | Only by passing a different string on every call.                                        | `context.setStrategy(...)` (see `Checkout` in `payment-after.ts`).             |
| Where does the knowledge live?    | Mixed into one function.                                                                 | Each fee rule has its own named home.                                          |

### Open/Closed Principle

> Software should be **open for extension** but **closed for modification**.

After the refactor, you add a payment method (extension) without editing the existing, tested code (modification). The `Context`, the UI and the other strategies stay untouched. This is the main reason to use Strategy.

### Testability

Each strategy is a tiny pure class: an input goes in and a result comes out. You can test it on its own ([`payment.test.ts`](../src/domains/payment/payment.test.ts)) and give code that needs a strategy a fake one in tests (see [`context.test.ts`](../src/shared/context.test.ts)).

## What it cost

Strategy is not free. You traded **one 15-line function** for **an interface, three classes and a registry**. For three stable payment methods that never change, the `if/else` version is honestly fine. The refactor pays off when:

- new variants keep arriving,
- each variant has real logic (not just one number),
- you need to swap the behaviour at runtime, or
- several teams or files need to add variants without touching each other's code.

If none of these apply, a plain object of functions may be enough. See [concepts.md](concepts.md#strategy-vs-a-plain-function).

## Try it yourself

[Exercise 1](exercises.md#1-add-a-payment-method-beginner) asks you to add a new payment method to both versions. Count how many existing lines you had to change in each.
