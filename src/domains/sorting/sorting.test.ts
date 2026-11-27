import { describe, expect, it } from 'vitest';
import { createSortingRegistry } from './sorting.registry';
import { BubbleSortStrategy } from './strategies/bubble-sort.strategy';
import { MergeSortStrategy } from './strategies/merge-sort.strategy';
import { QuickSortStrategy } from './strategies/quick-sort.strategy';

const sample = [5, 1, 4, 2, 8];
const strategies = [new BubbleSortStrategy(), new QuickSortStrategy(), new MergeSortStrategy()];

// Behaviour every sorting strategy must share: one test, run against each strategy.
describe.each(strategies)('$label', (strategy) => {
  it('sorts numbers in ascending order', () => {
    expect(strategy.execute(sample).sorted).toEqual([1, 2, 4, 5, 8]);
    expect(strategy.execute([3, -1, 3, 0]).sorted).toEqual([-1, 0, 3, 3]);
  });

  it('handles empty and single-item lists', () => {
    expect(strategy.execute([])).toEqual({ sorted: [], steps: 0 });
    expect(strategy.execute([7])).toEqual({ sorted: [7], steps: 0 });
  });

  it('does not change the input array', () => {
    const input = [3, 2, 1];
    strategy.execute(input);
    expect(input).toEqual([3, 2, 1]);
  });
});

// What makes each strategy different: how many comparisons it needs.
describe('step counter', () => {
  it('counts comparisons for each algorithm', () => {
    expect(new BubbleSortStrategy().execute(sample).steps).toBe(9);
    expect(new QuickSortStrategy().execute(sample).steps).toBe(8);
    expect(new MergeSortStrategy().execute(sample).steps).toBe(8);
  });

  it('bubble sort stops early when the list is already sorted', () => {
    expect(new BubbleSortStrategy().execute([1, 2, 3, 4, 5]).steps).toBe(4);
  });

  it('merge sort needs far fewer steps than bubble sort on a reversed list', () => {
    const reversed = Array.from({ length: 50 }, (_, i) => 50 - i);

    const bubbleSteps = new BubbleSortStrategy().execute(reversed).steps;
    const mergeSteps = new MergeSortStrategy().execute(reversed).steps;

    expect(bubbleSteps).toBe(1225); // 50 * 49 / 2
    expect(mergeSteps).toBeLessThan(bubbleSteps / 5);
  });
});

describe('sorting registry', () => {
  it('registers every sorting algorithm', () => {
    expect(createSortingRegistry().keys()).toEqual(['bubble', 'quick', 'merge']);
  });
});
