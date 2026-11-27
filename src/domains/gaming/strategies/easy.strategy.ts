import { scaleEnemyStats } from '../enemy-stats';
import type { GamingResult, GamingStrategy } from '../gaming.types';

/** ROLE: Concrete Strategy. Weaker enemies, smaller rewards. */
export class EasyStrategy implements GamingStrategy {
  readonly label = 'Easy';

  execute(level: number): GamingResult {
    return scaleEnemyStats(level, { health: 0.75, damage: 0.5, reward: 0.8 });
  }
}
