import { scaleEnemyStats } from '../enemy-stats';
import type { GamingResult, GamingStrategy } from '../gaming.types';

/** ROLE: Concrete Strategy. The game as designed: base stats, no changes. */
export class MediumStrategy implements GamingStrategy {
  readonly label = 'Medium';

  execute(level: number): GamingResult {
    return scaleEnemyStats(level, { health: 1, damage: 1, reward: 1 });
  }
}
