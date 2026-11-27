import { describe, expect, it } from 'vitest';
import { parseNumber, parseNumberList } from './parse';

describe('parseNumber', () => {
  it('accepts valid numbers', () => {
    expect(parseNumber(' 42.5 ')).toEqual({ ok: true, value: 42.5 });
  });

  it('rejects empty or non-numeric text', () => {
    expect(parseNumber('')).toEqual({ ok: false, error: 'Please enter a number.' });
    expect(parseNumber('abc')).toEqual({ ok: false, error: 'Please enter a number.' });
  });

  it('applies min, max and integer rules', () => {
    const rules = { min: 1, max: 10, integer: true };

    expect(parseNumber('0', rules).ok).toBe(false);
    expect(parseNumber('11', rules).ok).toBe(false);
    expect(parseNumber('2.5', rules).ok).toBe(false);
    expect(parseNumber('7', rules)).toEqual({ ok: true, value: 7 });
  });
});

describe('parseNumberList', () => {
  it('splits on commas and spaces', () => {
    expect(parseNumberList('5, 1  4,2')).toEqual({ ok: true, value: [5, 1, 4, 2] });
  });

  it('names the first invalid item', () => {
    expect(parseNumberList('1, two, 3')).toEqual({ ok: false, error: '"two" is not a number.' });
  });

  it('rejects empty and too-long lists', () => {
    expect(parseNumberList('  ').ok).toBe(false);
    expect(parseNumberList('1 2 3', 2).ok).toBe(false);
  });
});
