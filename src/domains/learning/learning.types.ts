import type { Strategy } from '../../shared/strategy';

export interface LearningResult {
  /** Total study time for all the lessons. */
  estimatedHours: number;
  /** How much you are likely to remember, from 0 to 100 (illustrative numbers). */
  retentionScore: number;
}

/** ROLE: Strategy. Input: the number of lessons to study. */
export interface LearningStrategy extends Strategy<number, LearningResult> {}
