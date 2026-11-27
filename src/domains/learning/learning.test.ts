import { describe, expect, it } from 'vitest';
import { createLearningRegistry } from './learning.registry';
import { PracticeStrategy } from './strategies/practice.strategy';
import { ReadingStrategy } from './strategies/reading.strategy';
import { VideoStrategy } from './strategies/video.strategy';

describe('learning strategies', () => {
  it('VideoStrategy: 0.75 h per lesson, retention 45', () => {
    expect(new VideoStrategy().execute(4)).toEqual({ estimatedHours: 3, retentionScore: 45 });
  });

  it('ReadingStrategy: 1.25 h per lesson, retention 55', () => {
    expect(new ReadingStrategy().execute(4)).toEqual({ estimatedHours: 5, retentionScore: 55 });
  });

  it('PracticeStrategy: 2 h per lesson, retention grows with each lesson', () => {
    expect(new PracticeStrategy().execute(4)).toEqual({ estimatedHours: 8, retentionScore: 78 });
  });

  it('PracticeStrategy caps retention at 95', () => {
    expect(new PracticeStrategy().execute(50).retentionScore).toBe(95);
  });
});

describe('learning registry', () => {
  it('registers every learning strategy', () => {
    expect(createLearningRegistry().keys()).toEqual(['video', 'reading', 'practice']);
  });
});
