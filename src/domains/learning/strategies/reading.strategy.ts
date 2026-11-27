import type { LearningResult, LearningStrategy } from '../learning.types';

/** ROLE: Concrete Strategy. Slower than video, and you remember a bit more. */
export class ReadingStrategy implements LearningStrategy {
  readonly label = 'Reading';

  private readonly hoursPerLesson = 1.25;
  private readonly retentionScore = 55;

  execute(lessons: number): LearningResult {
    return {
      estimatedHours: lessons * this.hoursPerLesson,
      retentionScore: this.retentionScore,
    };
  }
}
