# Patrón de diseño Strategy (TypeScript)

Ejemplos prácticos del patrón **Strategy** hechos con TypeScript y Vite, sin frameworks. Es un proyecto pensado para aprender: cada ejemplo es pequeño y se puede leer en pocos minutos.

## ¿Qué es el patrón Strategy?

Es un patrón de comportamiento que permite definir una familia de algoritmos, poner cada uno en su propia clase y hacerlos **intercambiables** en tiempo de ejecución. Así evitas llenar tu código de `if / else` o `switch` cada vez que aparece una nueva variante.

Tiene tres piezas:

| Pieza | Qué hace | Ejemplo en este repo |
|---|---|---|
| **Strategy** (interfaz) | Define el contrato que cumplen todos los algoritmos | `IPaymentStrategy` |
| **Estrategias concretas** | Cada una implementa el algoritmo a su manera | `CardStrategy`, `NequiStrategy`, `PaypalStrategy` |
| **Context** | Guarda la estrategia actual y delega el trabajo en ella | `PaymentContext` |

```ts
const contexto = new PaymentContext(new NequiStrategy());
contexto.execute(50000);                 // "Pagando $50000 con Nequi"

contexto.setStrategy(new CardStrategy()); // cambio de algoritmo en ejecución
contexto.execute(50000);                 // "Pagando $50000 con Tarjeta"
```

Para agregar un nuevo método de pago solo creas una clase nueva que implemente la interfaz; no tocas el contexto ni las demás estrategias.

## Ejemplos incluidos

Cada dominio vive en `front/mi-frontend/src/<dominio>/` con la misma estructura: `core/` (interfaz + contexto) y `strategies/` (implementaciones).

- **payment**: pagos con tarjeta, Nequi o PayPal.
- **learning**: aprender un tema con video, lectura o práctica.
- **gaming**: niveles de dificultad fácil, medio o difícil.
- **healtcare**: tratamiento con medicación, cirugía o terapia.

`main.ts` conecta cada ejemplo con la interfaz de `index.html`.

## Cómo ejecutarlo

Necesitas [Node.js](https://nodejs.org/) instalado.

```bash
cd front/mi-frontend
npm install
npm run dev
```

Luego abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción: `npm run build`.

## Tecnologías

TypeScript · Vite · HTML y CSS

## Autor

Brayan Rojas, Medellín, Colombia.
