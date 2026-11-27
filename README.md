# Strategy Design Pattern (TypeScript)

Hands-on examples of the **Strategy** design pattern built with TypeScript and Vite, with no frameworks. Each example is small and can be read in a few minutes, so it works well for learning.

## What is the Strategy pattern?

Strategy is a behavioral design pattern that lets you define a family of algorithms, put each one in its own class, and make them **interchangeable** at runtime. This keeps your code free of long `if / else` or `switch` chains every time a new variant appears.

It has three parts:

| Part | What it does | Example in this repo |
|---|---|---|
| **Strategy** (interface) | Defines the contract every algorithm follows | `IPaymentStrategy` |
| **Concrete strategies** | Each one implements the algorithm its own way | `CardStrategy`, `NequiStrategy`, `PaypalStrategy` |
| **Context** | Holds the current strategy and delegates the work to it | `PaymentContext` |

```ts
const context = new PaymentContext(new NequiStrategy());
context.execute(50000);                  // "Pagando $50000 con Nequi"

context.setStrategy(new CardStrategy()); // swap the algorithm at runtime
context.execute(50000);                  // "Pagando $50000 con Tarjeta"
```

To add a new payment method, you only create a new class that implements the interface. The context and the other strategies stay untouched.

## Included examples

Each domain lives in `front/mi-frontend/src/<domain>/` with the same structure: `core/` (interface + context) and `strategies/` (implementations).

- **payment**: pay with card, Nequi or PayPal.
- **learning**: study a topic through video, reading or practice.
- **gaming**: easy, medium or hard difficulty levels.
- **healtcare**: treatment through medication, surgery or therapy.

`main.ts` connects each example to the UI in `index.html`.

## How to run it

You need [Node.js](https://nodejs.org/) installed.

```bash
cd front/mi-frontend
npm install
npm run dev
```

Then open the address shown in the terminal (usually `http://localhost:5173`).

To create a production build: `npm run build`.

## Tech stack

TypeScript · Vite · HTML & CSS

## Author

Brayan Rojas, Medellín, Colombia.
