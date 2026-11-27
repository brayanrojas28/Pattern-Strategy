import type { LearningResult, LearningStrategy } from '../learning.types';

/**
 * ROLE: Concrete Strategy. Hands-on exercises take the longest, but retention
 * grows with every lesson you practice (capped at 95).
 */
export class PracticeStrategy implements LearningStrategy {
  readonly label = 'Hands-on practice';

  private readonly hoursPerLesson = 2;
  private readonly baseRetention = 70;
  private readonly retentionPerLesson = 2;
  private readonly maxRetention = 95;

  execute(lessons: number): LearningResult {
    const retention = this.baseRetention + lessons * this.retentionPerLesson;
    return {
      estimatedHours: lessons * this.hoursPerLesson,
      retentionScore: Math.min(retention, this.maxRetention),
    };
  }
}
