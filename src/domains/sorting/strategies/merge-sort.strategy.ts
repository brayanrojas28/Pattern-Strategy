import type { SortingResult, SortingStrategy } from '../sorting.types';

/**
 * ROLE: Concrete Strategy. Merge sort splits the list in halves, sorts each half,
 * then merges them back in order. Always O(n log n).
 */
export class MergeSortStrategy implements SortingStrategy {
  readonly label = 'Merge sort';

  execute(numbers: number[]): SortingResult {
    let steps = 0;

    const mergeSort = (list: number[]): number[] => {
      if (list.length <= 1) return list;

      const middle = Math.floor(list.length / 2);
      const left = mergeSort(list.slice(0, middle));
      const right = mergeSort(list.slice(middle));

      const merged: number[] = [];
      let l = 0;
      let r = 0;
      while (l < left.length && r < right.length) {
        steps++;
        if (left[l] <= right[r]) {
          merged.push(left[l]);
          l++;
        } else {
          merged.push(right[r]);
          r++;
        }
      }
      return [...merged, ...left.slice(l), ...right.slice(r)];
    };

    return { sorted: mergeSort([...numbers]), steps };
  }
}
