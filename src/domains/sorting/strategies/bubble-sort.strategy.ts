import type { SortingResult, SortingStrategy } from '../sorting.types';

/**
 * ROLE: Concrete Strategy. Bubble sort repeatedly swaps neighbours that are in
 * the wrong order. Simple but slow (O(n²)), though it stops early on sorted input.
 */
export class BubbleSortStrategy implements SortingStrategy {
  readonly label = 'Bubble sort';

  execute(numbers: number[]): SortingResult {
    const items = [...numbers];
    let steps = 0;

    for (let end = items.length - 1; end > 0; end--) {
      let swapped = false;
      for (let i = 0; i < end; i++) {
        steps++;
        if (items[i] > items[i + 1]) {
          [items[i], items[i + 1]] = [items[i + 1], items[i]];
          swapped = true;
        }
      }
      if (!swapped) break;
    }

    return { sorted: items, steps };
  }
}
