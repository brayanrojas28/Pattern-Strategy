# Diagrams

GitHub renders these Mermaid diagrams automatically. In other viewers, paste them into [mermaid.live](https://mermaid.live).

## 1. The pattern (generic classes in `src/shared`)

```mermaid
classDiagram
    direction LR

    class Strategy {
        <<interface>>
        +label string
        +execute(TInput input) TOutput
    }

    class Context {
        -strategy Strategy
        +setStrategy(Strategy strategy) void
        +getStrategy() Strategy
        +execute(TInput input) TOutput
    }

    class StrategyRegistry {
        -strategies Map
        +register(string key, Strategy strategy) StrategyRegistry
        +get(string key) Strategy
        +has(string key) boolean
        +keys() string[]
    }

    Context o--> Strategy : delegates to
    StrategyRegistry o--> Strategy : stores by key
```

- **Strategy** is the interface. **Context** holds one strategy and forwards `execute()` to it.
- **StrategyRegistry** is the lookup table the UI uses instead of `if/else`.

## 2. One domain: payment

```mermaid
classDiagram
    direction TB

    class Strategy {
        <<interface>>
        +label string
        +execute(TInput input) TOutput
    }

    class PaymentStrategy {
        <<interface>>
        +execute(number amount) PaymentResult
    }

    class CardStrategy {
        -percentage = 0.029
        -fixedFee = 0.30
        +execute(number amount) PaymentResult
    }

    class PaypalStrategy {
        -percentage = 0.035
        +execute(number amount) PaymentResult
    }

    class NequiStrategy {
        +execute(number amount) PaymentResult
    }

    class PaymentResult {
        +fee number
        +total number
    }

    Strategy <|-- PaymentStrategy
    PaymentStrategy <|.. CardStrategy
    PaymentStrategy <|.. PaypalStrategy
    PaymentStrategy <|.. NequiStrategy
    PaymentStrategy ..> PaymentResult : returns
```

Every other domain (`learning`, `gaming`, `healthcare`, `sorting`, `pricing`) has exactly the same shape: one interface, several concrete strategies, one result type.

## 3. Swapping a strategy at runtime (what each UI card does)

```mermaid
sequenceDiagram
    actor User
    participant Card as Card UI
    participant Registry as StrategyRegistry
    participant Context
    participant Card1 as CardStrategy
    participant PayPal as PaypalStrategy

    Note over Card,Context: When the card is created
    Card->>Registry: get('card')
    Registry-->>Card: CardStrategy
    Card->>Context: new Context(CardStrategy)

    User->>Card: types 100
    Card->>Context: execute(100)
    Context->>Card1: execute(100)
    Card1-->>Context: { fee: 3.2, total: 103.2 }
    Context-->>Card: result
    Card-->>User: shows Fee $3.20, Total $103.20

    User->>Card: selects "PayPal"
    Card->>Registry: get('paypal')
    Registry-->>Card: PaypalStrategy
    Card->>Context: setStrategy(PaypalStrategy)
    Card->>Context: execute(100)
    Context->>PayPal: execute(100)
    PayPal-->>Context: { fee: 3.5, total: 103.5 }
    Context-->>Card: result
    Card-->>User: shows Fee $3.50, Total $103.50
```

Notice that the **same Context object** is used before and after the swap. Only its strategy changed.

## 4. Before vs after: who knows about the payment methods?

```mermaid
flowchart LR
    subgraph Before
        A[calculatePayment] -->|if card| B[card formula]
        A -->|else if paypal| C[paypal formula]
        A -->|else if nequi| D[nequi formula]
    end

    subgraph After
        E[calculatePayment] --> R[(registry)]
        R --> F[CardStrategy]
        R --> G[PaypalStrategy]
        R --> H[NequiStrategy]
    end
```

Before, the function knows every method. After, it only knows the registry, and new methods plug in without changing it. See [before-after.md](before-after.md).
