import type { Strategy } from '../../shared/strategy';

export interface SortingResult {
  /** A new sorted array. The input array is never changed. */
  sorted: number[];
  /** How many comparisons the algorithm needed. */
  steps: number;
}

/** ROLE: Strategy. Input: the numbers to sort (ascending). */
export interface SortingStrategy extends Strategy<number[], SortingResult> {}
