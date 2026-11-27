# Strategy Pattern Playground

[![CI](https://github.com/brayanrojas28/Pattern-Strategy/actions/workflows/ci.yml/badge.svg)](https://github.com/brayanrojas28/Pattern-Strategy/actions/workflows/ci.yml)

A small, hands-on project for **learning and practicing the Strategy design pattern** in TypeScript. It has six interactive examples, tests for every strategy, a before/after refactor, diagrams and ten graded exercises. There is no framework, just TypeScript and Vite, so all the code is about the pattern.

## What is the Strategy pattern?

Strategy is a behavioral design pattern: you put each variant of an algorithm in its own class behind a **common interface**, and the code that uses them can **swap one for another at runtime**, without `if/else` or `switch` chains.

| Role                  | What it does                                            | In this repo                                        |
| --------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| **Strategy**          | The interface every algorithm implements                | `Strategy<TInput, TOutput>`, `PaymentStrategy`, ... |
| **Concrete Strategy** | One specific algorithm                                  | `CardStrategy`, `PaypalStrategy`, `NequiStrategy`   |
| **Context**           | Holds the current strategy and delegates the work to it | `Context<TInput, TOutput>`                          |

### Minimal example

```ts
import { Context } from './shared/context';
import { CardStrategy } from './domains/payment/strategies/card.strategy';
import { NequiStrategy } from './domains/payment/strategies/nequi.strategy';

const context = new Context(new CardStrategy());
context.execute(100); // { fee: 3.2, total: 103.2 }   (2.9% + 0.30)

context.setStrategy(new NequiStrategy()); // swap the algorithm at runtime
context.execute(100); // { fee: 0, total: 100 }
```

The `Context` only knows the `Strategy` interface, never a concrete class. That is what makes the strategies interchangeable.

## The examples

Each card in the playground keeps **one** `Context`. Changing the select calls `setStrategy()` on it, and the result updates instantly.

| Domain            | Strategies                                    | Input             | Result                                      |
| ----------------- | --------------------------------------------- | ----------------- | ------------------------------------------- |
| 💳 **Payment**    | card (2.9% + 0.30), PayPal (3.5%), Nequi (0%) | amount            | `{ fee, total }`                            |
| 🛒 **Pricing**    | standard, express, black-friday, loyalty      | cart subtotal     | `{ subtotal, discount, shipping, total }`   |
| 🔢 **Sorting**    | bubble, quick, merge                          | list of numbers   | `{ sorted, steps }`                         |
| 📚 **Learning**   | video, reading, practice                      | number of lessons | `{ estimatedHours, retentionScore }`        |
| 🎮 **Gaming**     | easy, medium, hard                            | level             | `{ enemyHealth, enemyDamage, rewardCoins }` |
| 🏥 **Healthcare** | medication, surgery, therapy                  | severity (1–10)   | `{ cost, recoveryDays, riskLevel }`         |

The learning, gaming and healthcare numbers are made up for teaching.

## Getting started

You need [Node.js](https://nodejs.org/) 20.19 or newer.

```bash
npm install
npm run dev          # open http://localhost:5173
```

| Script                 | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the playground with hot reload     |
| `npm test`             | Run all unit tests once (Vitest)         |
| `npm run test:watch`   | Re-run tests on every save               |
| `npm run lint`         | Check the code with ESLint               |
| `npm run typecheck`    | Check types with the TypeScript compiler |
| `npm run format`       | Format everything with Prettier          |
| `npm run format:check` | Check formatting without changing files  |
| `npm run build`        | Type-check and build for production      |

GitHub Actions runs lint, typecheck, format check, tests and build on every push.

## Project structure

```
.
├── docs/
│   ├── concepts.md            # what, when, when NOT, Strategy vs State vs functions
│   ├── before-after.md        # an if/else function refactored to Strategy
│   ├── diagrams.md            # Mermaid class and sequence diagrams
│   └── exercises.md           # 10 graded exercises with hints
├── src/
│   ├── shared/                # the reusable pattern pieces
│   │   ├── strategy.ts        #   Strategy<TInput, TOutput>  (role: Strategy)
│   │   ├── context.ts         #   Context<TInput, TOutput>   (role: Context)
│   │   ├── strategy-registry.ts  # key -> strategy lookup, replaces if/switch
│   │   └── money.ts
│   ├── domains/               # one folder per example, all with the same layout
│   │   └── payment/
│   │       ├── payment.types.ts     # PaymentStrategy interface + result type
│   │       ├── payment.registry.ts  # the one place strategies are registered
│   │       ├── payment.test.ts
│   │       └── strategies/          # role: Concrete Strategy
│   │           ├── card.strategy.ts
│   │           ├── paypal.strategy.ts
│   │           └── nequi.strategy.ts
│   │   (learning, gaming, healthcare, sorting and pricing look the same)
│   ├── examples/before-after/ # the same logic as if/else and as Strategy
│   ├── ui/
│   │   ├── strategy-card.ts   # generic card: one Context, setStrategy() on change
│   │   ├── cards.ts           # per-domain input parsing and result formatting
│   │   ├── parse.ts
│   │   └── format.ts
│   ├── main.ts
│   └── style.css
├── index.html
└── package.json
```

## Learn and practice

1. **[Concepts](docs/concepts.md):** the pattern, when to use it, and when not to.
2. **[Diagrams](docs/diagrams.md):** the roles and a runtime swap, drawn.
3. **[Before and after](docs/before-after.md):** a real refactor from `if/else`, and what improved (Open/Closed Principle, testability).
4. **[Exercises](docs/exercises.md):** ten exercises, from "add a payment method" to "Strategy + Factory" and "Strategy or State?".

## How to add your own strategy

Example: add **Apple Pay** (1.5% + 0.10) to the payment card.

**1. Create the class** in `src/domains/payment/strategies/apple-pay.strategy.ts`:

```ts
import { roundToCents } from '../../../shared/money';
import type { PaymentResult, PaymentStrategy } from '../payment.types';

/** ROLE: Concrete Strategy. Apple Pay fee: 1.5% + a fixed 0.10. */
export class ApplePayStrategy implements PaymentStrategy {
  readonly label = 'Apple Pay';

  execute(amount: number): PaymentResult {
    const fee = roundToCents(amount * 0.015 + 0.1);
    return { fee, total: roundToCents(amount + fee) };
  }
}
```

**2. Register it** in `src/domains/payment/payment.registry.ts` (and import the class at the top):

```ts
    .register('nequi', new NequiStrategy())
    .register('apple-pay', new ApplePayStrategy());
```

**3. Test it** in `src/domains/payment/payment.test.ts`:

```ts
it('ApplePayStrategy charges 1.5% + 0.10', () => {
  expect(new ApplePayStrategy().execute(100)).toEqual({ fee: 1.6, total: 101.6 });
});
```

Also add `'apple-pay'` to the expected keys in the registry test.

**4. Run it:** `npm test`, then `npm run dev`. Apple Pay is already in the select.

That's all. You did **not** touch the `Context`, the UI or any other strategy. That is the Open/Closed Principle in practice.

**Adding a whole new domain?** Copy a domain folder (pricing is a good template), rename the types, then add a card config to `src/ui/cards.ts` and one `mountStrategyCard()` line to `src/main.ts`. [Exercise 7](docs/exercises.md#7-add-a-new-domain-intermediate) walks through it.

## Tech stack

TypeScript (strict) · Vite · Vitest · ESLint · Prettier · HTML & CSS

## Author

Brayan Rojas, Medellín, Colombia.
