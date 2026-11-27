import { StrategyRegistry } from '../../shared/strategy-registry';
import type { LearningResult } from './learning.types';
import { PracticeStrategy } from './strategies/practice.strategy';
import { ReadingStrategy } from './strategies/reading.strategy';
import { VideoStrategy } from './strategies/video.strategy';

export function createLearningRegistry(): StrategyRegistry<number, LearningResult> {
  return new StrategyRegistry<number, LearningResult>()
    .register('video', new VideoStrategy())
    .register('reading', new ReadingStrategy())
    .register('practice', new PracticeStrategy());
}
