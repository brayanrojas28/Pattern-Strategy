import type { SortingResult, SortingStrategy } from '../sorting.types';

/**
 * ROLE: Concrete Strategy. Quick sort picks a pivot (here the last item), moves
 * smaller items to its left, and sorts both sides recursively. O(n log n) on average.
 */
export class QuickSortStrategy implements SortingStrategy {
  readonly label = 'Quick sort';

  execute(numbers: number[]): SortingResult {
    const items = [...numbers];
    let steps = 0;

    const swap = (a: number, b: number): void => {
      [items[a], items[b]] = [items[b], items[a]];
    };

    const partition = (low: number, high: number): number => {
      const pivot = items[high];
      let boundary = low;
      for (let i = low; i < high; i++) {
        steps++;
        if (items[i] < pivot) {
          swap(boundary, i);
          boundary++;
        }
      }
      swap(boundary, high);
      return boundary;
    };

    const sort = (low: number, high: number): void => {
      if (low >= high) return;
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    };

    sort(0, items.length - 1);
    return { sorted: items, steps };
  }
}
