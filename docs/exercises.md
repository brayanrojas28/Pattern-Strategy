# Exercises

Ten exercises, from beginner to advanced. Each one has a goal, a "done when" check and hidden hints. Try it before you open the hints.

Before you start:

```bash
npm install
npm run test:watch   # re-runs the tests every time you save
npm run dev          # the playground at http://localhost:5173
```

| #   | Exercise                                                                                   | Level        | You practice                        |
| --- | ------------------------------------------------------------------------------------------ | ------------ | ----------------------------------- |
| 1   | [Add a payment method](#1-add-a-payment-method-beginner)                                   | Beginner     | Concrete Strategy, registry         |
| 2   | [Add a difficulty level](#2-add-a-difficulty-level-beginner)                               | Beginner     | The UI updates itself               |
| 3   | [Add insertion sort](#3-add-insertion-sort-beginner)                                       | Beginner     | Shared tests for all strategies     |
| 4   | [Replace a class with a plain object](#4-replace-a-class-with-a-plain-object-intermediate) | Intermediate | Strategy without classes            |
| 5   | [A strategy that needs configuration](#5-a-strategy-that-needs-configuration-intermediate) | Intermediate | Constructor parameters              |
| 6   | [Refactor an if/else chain](#6-refactor-an-ifelse-chain-intermediate)                      | Intermediate | The full refactor, test first       |
| 7   | [Add a new domain](#7-add-a-new-domain-intermediate)                                       | Intermediate | All the pieces together             |
| 8   | [Combine Strategy with a Factory](#8-combine-strategy-with-a-factory-advanced)             | Advanced     | Choosing the strategy from rules    |
| 9   | [Decorate a strategy](#9-decorate-a-strategy-advanced)                                     | Advanced     | Wrapping strategies, composition    |
| 10  | [Strategy or State?](#10-strategy-or-state-advanced)                                       | Advanced     | Knowing which pattern you are using |

---

## 1. Add a payment method (beginner)

**Goal:** add **Apple Pay**, which charges **1.5% + 0.10**.

1. Create `src/domains/payment/strategies/apple-pay.strategy.ts`.
2. Register it in `payment.registry.ts` with the key `'apple-pay'`.
3. Add a test to `payment.test.ts`: `100` should give `{ fee: 1.6, total: 101.6 }`.
4. Bonus: add the same method to [`payment-before.ts`](../src/examples/before-after/payment-before.ts) too. Which version needed you to edit existing code?

**Done when:** the tests pass and Apple Pay appears in the Payments card **without you touching any UI file**.

<details>
<summary>Hints</summary>

- Copy `card.strategy.ts`. It already has a percentage and a fixed fee.
- Remember the `label`: that is the text shown in the select.
- The registry test checks the list of keys, so update it as well.

</details>

## 2. Add a difficulty level (beginner)

**Goal:** add a **Nightmare** difficulty: health ×3, damage ×2.5, reward ×4.

**Done when:** it shows up in the Game difficulty card, and a test checks level 1 gives `{ enemyHealth: 300, enemyDamage: 25, rewardCoins: 200 }`.

<details>
<summary>Hints</summary>

- Look at `hard.strategy.ts` and `scaleEnemyStats()` in `enemy-stats.ts`.
- Ask yourself: why did the select update without any change to `src/ui/`? (Answer: the options are built from `registry.keys()`.)

</details>

## 3. Add insertion sort (beginner)

**Goal:** add `InsertionSortStrategy` to the sorting domain, counting each comparison as a step.

**Done when:** you add it to the `strategies` array at the top of `sorting.test.ts`, and **all the shared tests** (sorting, empty lists, no mutation) pass for it without writing new ones.

<details>
<summary>Hints</summary>

- Insertion sort: walk the list from left to right. Take each item and move it left while the item before it is larger.
- Copy the input first (`const items = [...numbers]`) so you do not change the caller's array.
- `describe.each(strategies)` runs the same tests for every strategy. This is a big testing benefit of a common interface.
- On an already sorted list of 5 items, insertion sort should need 4 steps, like bubble sort.

</details>

## 4. Replace a class with a plain object (intermediate)

**Goal:** rewrite `NequiStrategy` as a plain object instead of a class:

```ts
export const nequiStrategy: PaymentStrategy = {
  label: 'Nequi',
  execute: (amount) => ({ fee: 0, total: roundToCents(amount) }),
};
```

Register it and update its test.

**Done when:** everything still works, then answer in one sentence each:

- Why does this compile, even though `PaymentStrategy` is "an interface for classes"?
- When would you **keep** the class? (Think about configuration and private helpers.)

<details>
<summary>Hints</summary>

- TypeScript checks the **shape** (structural typing), not the class name.
- Read [Strategy vs a plain function](concepts.md#strategy-vs-a-plain-function).

</details>

## 5. A strategy that needs configuration (intermediate)

`BlackFridayPricingStrategy` and `LoyaltyPricingStrategy` are almost the same: a discount rate plus a shipping cost.

**Goal:** replace both with **one configurable class**:

```ts
registry
  .register(
    'black-friday',
    new DiscountPricingStrategy({ label: 'Black Friday (30% off)', rate: 0.3, shipping: 5 }),
  )
  .register(
    'loyalty',
    new DiscountPricingStrategy({
      label: 'Loyalty (10% off, free shipping)',
      rate: 0.1,
      shipping: 0,
    }),
  );
```

**Done when:** the existing pricing tests still pass (only the imports change), and you add a test for a `'summer-sale'` at 15% off with standard shipping.

<details>
<summary>Hints</summary>

- `tsconfig.json` has `erasableSyntaxOnly`, so `constructor(private rate: number)` is not allowed. Declare the fields and assign them in the constructor.
- Make the fields `readonly`. A strategy should not change after it is created.
- Discuss: one configurable class or one class per rule? When is each better?

</details>

## 6. Refactor an if/else chain (intermediate)

Here is some code that sends notifications:

```ts
function notify(channel: string, user: { email: string; phone: string }, text: string): string {
  if (channel === 'email') {
    return `To ${user.email}: ${text}`;
  } else if (channel === 'sms') {
    return `SMS ${user.phone}: ${text.slice(0, 160)}`;
  } else if (channel === 'push') {
    return `PUSH: ${text.slice(0, 50)}`;
  }
  throw new Error(`Unknown channel ${channel}`);
}
```

**Goal:** refactor it to Strategy in a new folder `src/domains/notification/`.

1. **First** write tests for the current `notify` function (characterization tests).
2. Then create `NotificationStrategy`, three concrete strategies and a registry.
3. Make the same tests pass against the new version, like [`before-after.test.ts`](../src/examples/before-after/before-after.test.ts) does.

**Done when:** both versions pass the same tests.

<details>
<summary>Hints</summary>

- The input has two parts (user and text), so make it an object: `Strategy<{ user: User; text: string }, string>`.
- Writing the tests first is what makes a refactor safe.

</details>

## 7. Add a new domain (intermediate)

**Goal:** add a seventh card, **Tax**, that calculates sales tax for a price with strategies such as `colombia` (19% VAT), `usa-texas` (6.25%) and `tax-free` (0%).

You will need: `tax.types.ts`, a `strategies/` folder, `tax.registry.ts`, `tax.test.ts`, a `taxCard` config in `src/ui/cards.ts`, and one `mountStrategyCard()` line in `main.ts`.

**Done when:** the card works in the browser, and `npm test`, `npm run lint` and `npm run typecheck` pass.

<details>
<summary>Hints</summary>

- Copy the pricing domain as a template. It has the same input (a price).
- Return a structured result, for example `{ tax: number; total: number }`, not a string.

</details>

## 8. Combine Strategy with a Factory (advanced)

So far **the user** picks the strategy. In real shops, **rules** pick it.

**Goal:** write `choosePricingStrategy(customer, date)` in `src/domains/pricing/pricing.factory.ts`:

- if the date is Black Friday (the day after the fourth Thursday of November, for example 2026-11-27), return Black Friday pricing;
- otherwise, if `customer.isLoyaltyMember`, return loyalty pricing;
- otherwise, if `customer.wantsFastDelivery`, return express;
- otherwise, return standard.

**Done when:** you have a test for each rule, and the Context code (`new Context(choosePricingStrategy(...))`) never needs to know about the rules.

<details>
<summary>Hints</summary>

- Yes, this factory has `if` statements, and that is fine. The decision now lives in **one** place, and everything that uses the result stays branch-free.
- Pass the date as a parameter instead of calling `new Date()` inside, so tests can control it.
- Bonus: should the factory create a new strategy each time or reuse the instances from the registry?

</details>

## 9. Decorate a strategy (advanced)

**Goal:** create `MinimumFeeDecorator`, a payment strategy that **wraps another payment strategy** and makes sure the fee is never below a minimum:

```ts
const card = new MinimumFeeDecorator(new CardStrategy(), 0.5);
card.execute(1); // card fee would be 0.33, so the result is { fee: 0.5, total: 1.5 }
```

**Done when:** it works with **any** payment strategy (test it with at least two), and its `label` is built from the wrapped one (`"Credit card (min $0.50)"`).

<details>
<summary>Hints</summary>

- The decorator implements `PaymentStrategy` **and** receives a `PaymentStrategy` in its constructor.
- This is the Decorator pattern working together with Strategy: you add behaviour without changing `CardStrategy`.
- Register a decorated strategy in the registry and look at it in the UI.

</details>

## 10. Strategy or State? (advanced)

**Goal:** make the game adapt itself. Write a `GameSession` class that holds a `Context` with a gaming strategy and has `recordLoss()` and `recordWin()` methods:

- after **3 losses in a row**, it switches one level easier (hard → medium → easy);
- after **3 wins in a row**, it switches one level harder.

**Done when:** tests cover both directions and the limits (easy cannot get easier).

Then answer in writing:

1. Who calls `setStrategy()` now, the user or the object itself?
2. If each difficulty class decided "what comes next", would this still be Strategy, or would it be the **State** pattern?
3. Which design would you choose here, and why?

<details>
<summary>Hints</summary>

- Read [Strategy vs State](concepts.md#strategy-vs-state).
- Keeping the order in a simple array (`['easy', 'medium', 'hard']`) inside `GameSession` keeps the strategies independent of each other. Moving the "next level" knowledge into the strategies is what turns it into State.

</details>
