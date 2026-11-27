import { Context } from '../shared/context';
import type { StrategyRegistry } from '../shared/strategy-registry';
import type { ParseResult } from './parse';

export interface ResultRow {
  label: string;
  value: string;
}

/** Everything a card needs to know about one domain. */
export interface CardConfig<TInput, TOutput> {
  id: string;
  icon: string;
  title: string;
  description: string;
  input: {
    label: string;
    hint: string;
    defaultValue: string;
    /** Extra attributes for the <input>, e.g. { type: 'number', min: '0' }. */
    attributes: Record<string, string>;
  };
  registry: StrategyRegistry<TInput, TOutput>;
  parseInput(raw: string): ParseResult<TInput>;
  formatResult(result: TOutput): ResultRow[];
}

/**
 * Renders one card and wires it to ONE Context that lives as long as the card.
 *
 * Notice what is missing: no if/switch on the selected value. The select's
 * options come from the registry, and a change just calls setStrategy().
 */
export function mountStrategyCard<TInput, TOutput>(
  container: HTMLElement,
  config: CardConfig<TInput, TOutput>,
): void {
  const { registry } = config;
  const [firstKey] = registry.keys();
  const context = new Context(registry.get(firstKey));

  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('aria-labelledby', `${config.id}-title`);

  // Config strings are written by us, so a template is fine here.
  // Anything the user types is only ever written with textContent.
  card.innerHTML = `
    <h2 id="${config.id}-title"><span aria-hidden="true">${config.icon}</span> ${config.title}</h2>
    <p class="card-description">${config.description}</p>
    <label for="${config.id}-input">${config.input.label}</label>
    <input id="${config.id}-input" aria-describedby="${config.id}-hint" />
    <p id="${config.id}-hint" class="hint">${config.input.hint}</p>
    <label for="${config.id}-strategy">Strategy</label>
    <select id="${config.id}-strategy"></select>
    <p class="swap-log" aria-live="polite"><code></code></p>
    <div class="result" aria-live="polite" aria-label="${config.title} result"></div>
  `;

  const input = queryElement(card, 'input', HTMLInputElement);
  const select = queryElement(card, 'select', HTMLSelectElement);
  const swapLog = queryElement(card, '.swap-log code', HTMLElement);
  const output = queryElement(card, '.result', HTMLElement);

  for (const [name, value] of Object.entries(config.input.attributes)) {
    input.setAttribute(name, value);
  }
  input.value = config.input.defaultValue;

  for (const key of registry.keys()) {
    select.append(new Option(registry.get(key).label, key));
  }
  swapLog.textContent = `new Context(registry.get('${firstKey}'))`;

  const render = (): void => {
    const parsed = config.parseInput(input.value);
    if (!parsed.ok) {
      const error = document.createElement('p');
      error.className = 'error';
      error.textContent = parsed.error;
      output.replaceChildren(error);
      return;
    }

    const list = document.createElement('dl');
    for (const row of config.formatResult(context.execute(parsed.value))) {
      const term = document.createElement('dt');
      term.textContent = row.label;
      const detail = document.createElement('dd');
      detail.textContent = row.value;
      list.append(term, detail);
    }
    output.replaceChildren(list);
  };

  // Runtime swap: same Context, new strategy.
  select.addEventListener('change', () => {
    context.setStrategy(registry.get(select.value));
    swapLog.textContent = `context.setStrategy(registry.get('${select.value}'))`;
    render();
    highlight(output);
  });
  input.addEventListener('input', render);

  render();
  container.append(card);
}

function queryElement<T extends Element>(root: ParentNode, selector: string, type: new () => T): T {
  const element = root.querySelector(selector);
  if (!(element instanceof type)) {
    throw new Error(`Expected "${selector}" to be a ${type.name}.`);
  }
  return element;
}

/** Briefly flashes the result so the swap is visible (skipped for reduced motion). */
function highlight(element: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  element.animate([{ borderLeftColor: '#3ddc97', backgroundColor: '#1b2a24' }, {}], {
    duration: 600,
    easing: 'ease-out',
  });
}
