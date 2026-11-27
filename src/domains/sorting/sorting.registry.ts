import { StrategyRegistry } from '../../shared/strategy-registry';
import type { SortingResult } from './sorting.types';
import { BubbleSortStrategy } from './strategies/bubble-sort.strategy';
import { MergeSortStrategy } from './strategies/merge-sort.strategy';
import { QuickSortStrategy } from './strategies/quick-sort.strategy';

export function createSortingRegistry(): StrategyRegistry<number[], SortingResult> {
  return new StrategyRegistry<number[], SortingResult>()
    .register('bubble', new BubbleSortStrategy())
    .register('quick', new QuickSortStrategy())
    .register('merge', new MergeSortStrategy());
}
