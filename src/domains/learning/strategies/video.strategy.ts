import type { LearningResult, LearningStrategy } from '../learning.types';

/** ROLE: Concrete Strategy. Fast to watch, but you forget more. */
export class VideoStrategy implements LearningStrategy {
  readonly label = 'Video';

  private readonly hoursPerLesson = 0.75;
  private readonly retentionScore = 45;

  execute(lessons: number): LearningResult {
    return {
      estimatedHours: lessons * this.hoursPerLesson,
      retentionScore: this.retentionScore,
    };
  }
}
