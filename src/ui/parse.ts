/** Either a valid value, or a message explaining what is wrong with the input. */
export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string };

export interface NumberRules {
  min?: number;
  max?: number;
  integer?: boolean;
}

export function parseNumber(raw: string, rules: NumberRules = {}): ParseResult<number> {
  const text = raw.trim();
  const value = Number(text);

  if (text === '' || !Number.isFinite(value)) {
    return { ok: false, error: 'Please enter a number.' };
  }
  if (rules.integer && !Number.isInteger(value)) {
    return { ok: false, error: 'Please enter a whole number.' };
  }
  if (rules.min !== undefined && value < rules.min) {
    return { ok: false, error: `The value must be at least ${rules.min}.` };
  }
  if (rules.max !== undefined && value > rules.max) {
    return { ok: false, error: `The value must be at most ${rules.max}.` };
  }
  return { ok: true, value };
}

/** Parses "5, 1, 4" or "5 1 4" into [5, 1, 4]. */
export function parseNumberList(raw: string, maxItems = 100): ParseResult<number[]> {
  const parts = raw.split(/[\s,]+/).filter((part) => part !== '');

  if (parts.length === 0) {
    return { ok: false, error: 'Please enter at least one number.' };
  }
  if (parts.length > maxItems) {
    return { ok: false, error: `Please enter at most ${maxItems} numbers.` };
  }

  const numbers = parts.map(Number);
  const invalid = parts.find((_, i) => !Number.isFinite(numbers[i]));
  if (invalid !== undefined) {
    return { ok: false, error: `"${invalid}" is not a number.` };
  }
  return { ok: true, value: numbers };
}
