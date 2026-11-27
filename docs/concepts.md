# Strategy pattern: concepts

## What it is

**Strategy** is a behavioral design pattern. You take a family of algorithms that do the same job in different ways, put each one behind the same interface, and let the code that uses them switch between them, even at runtime.

The everyday version: a map app can take you somewhere by car, on foot or by bike. The task is the same (get a route from A to B), but each algorithm is different. The app holds "the current routing strategy" and asks it for a route, without caring which one it is.

## The three roles

| Role                  | Responsibility                                                    | In this repo                                                                     |
| --------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Strategy**          | The common interface every algorithm implements.                  | [`Strategy<TInput, TOutput>`](../src/shared/strategy.ts), `PaymentStrategy`, ... |
| **Concrete Strategy** | One specific algorithm.                                           | `CardStrategy`, `QuickSortStrategy`, `LoyaltyPricingStrategy`, ...               |
| **Context**           | Holds a strategy, delegates the work to it, and lets you swap it. | [`Context<TInput, TOutput>`](../src/shared/context.ts)                           |

```ts
const context = new Context(new CardStrategy());
context.execute(100); // { fee: 3.2, total: 103.2 }

context.setStrategy(new NequiStrategy()); // swap at runtime
context.execute(100); // { fee: 0, total: 100 }
```

The key idea: **the Context depends on the interface, never on a concrete class.** That is what makes the strategies interchangeable.

### And the registry?

[`StrategyRegistry`](../src/shared/strategy-registry.ts) is not part of the classic pattern, but it is a very common companion. Someone still has to turn a user choice (`"paypal"`) into a strategy object. Without a registry that is usually an `if/else` chain, which is exactly what we wanted to remove. The registry is a `Map` from key to strategy, so the lookup is one line and adding a strategy means adding one entry.

## When to use it

- You have **several variants of one algorithm** and the list keeps growing (payment methods, shipping rules, export formats).
- You see the **same `if/else` or `switch` on a "type"** repeated in several places.
- You need to **change the behaviour at runtime** (user picks a difficulty, an A/B test picks a pricing rule).
- Each variant has **enough logic to deserve its own name and tests**.
- You want **different people or modules to add variants** without editing shared code.

## When NOT to use it

- **There are only two variants and they will not change.** An `if` is clearer.
- **The variants differ only by a number or two.** Pass the number as data: `calculateFee(amount, rate)`. No classes needed.
- **The "algorithm" is one line.** A plain function or a lookup object of functions is enough (see below).
- **You are guessing about future variants.** Add the pattern when the second or third variant actually shows up, not before. Refactoring to Strategy later is easy (see [before-after.md](before-after.md)).

Every pattern adds files and indirection. Use it when it removes more complexity than it adds.

## Strategy vs State

The two look almost identical in code: a context object holds a reference to an interface and delegates to it. The difference is **who changes the object and why**.

|                                  | Strategy                                                | State                                                           |
| -------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| Question it answers              | _How_ should this task be done?                         | _What_ situation is this object in right now?                   |
| Who swaps it                     | The **client** (a user's choice, a config value).       | Usually the **states themselves**, as a reaction to events.     |
| Do the variants know each other? | No. `CardStrategy` has never heard of `PaypalStrategy`. | Often yes. `Draft` knows that `publish()` moves to `Published`. |
| Example                          | Pay by card or PayPal.                                  | An order: `Pending` → `Paid` → `Shipped` → `Delivered`.         |

Rule of thumb: if the variants are **interchangeable options**, it is Strategy. If they are **stages in a lifecycle**, it is State.

## Strategy vs a plain function

In JavaScript and TypeScript, functions are values, so a strategy can simply be a function:

```ts
type FeeRule = (amount: number) => number;

const feeRules: Record<string, FeeRule> = {
  card: (amount) => amount * 0.029 + 0.3,
  paypal: (amount) => amount * 0.035,
  nequi: () => 0,
};

feeRules['paypal'](100); // 3.5
```

This **is** the Strategy pattern, just without classes. The interface is the function type, and each function is a concrete strategy. Prefer it when each algorithm is short and needs no configuration.

Move to classes (or objects with several members) when:

- a strategy needs **more than one method or property** (here every strategy also has a `label` for the UI),
- it needs **configuration** passed in the constructor (`new CardStrategy({ rate: 0.029, fixedFee: 0.3 })`),
- it has **private helpers** or enough logic to deserve its own file and test file.

The shared [`Strategy`](../src/shared/strategy.ts) interface in this repo works with both styles, since a plain object `{ label, execute }` satisfies it (see [`context.test.ts`](../src/shared/context.test.ts)).

## Common mistakes

1. **Choosing the strategy with `if/else` inside the Context.** That only moves the chain somewhere else. Let the caller pick, or use a registry or factory.
2. **A Context that checks the concrete type** (`if (strategy instanceof CardStrategy)`). Then the strategies are no longer interchangeable.
3. **An interface that is too wide.** If some strategies throw "not supported" for half the methods, split the interface.
4. **Strategies with hidden shared state.** Keep them pure (input in, result out) where possible. They become trivial to test and safe to reuse.
5. **Mixing UI into strategies.** `CardStrategy` returns data (`{ fee, total }`). Formatting it as `"$3.20"` is the UI's job ([`src/ui/cards.ts`](../src/ui/cards.ts)).

## Next steps

- See the roles drawn in [diagrams.md](diagrams.md).
- See a real refactor in [before-after.md](before-after.md).
- Practice with [exercises.md](exercises.md).
