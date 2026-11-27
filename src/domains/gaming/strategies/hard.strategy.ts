import { scaleEnemyStats } from '../enemy-stats';
import type { GamingResult, GamingStrategy } from '../gaming.types';

/** ROLE: Concrete Strategy. Tougher enemies that hit harder, double rewards. */
export class HardStrategy implements GamingStrategy {
  readonly label = 'Hard';

  execute(level: number): GamingResult {
    return scaleEnemyStats(level, { health: 1.5, damage: 1.75, reward: 2 });
  }
}
