import type { GamingResult } from './gaming.types';

export interface DifficultyMultipliers {
  health: number;
  damage: number;
  reward: number;
}

/**
 * Base enemy stats grow with the level. Each difficulty strategy then
 * scales them with its own multipliers.
 */
export function scaleEnemyStats(level: number, multipliers: DifficultyMultipliers): GamingResult {
  const extraLevels = level - 1;
  const baseHealth = 100 + extraLevels * 20;
  const baseDamage = 10 + extraLevels * 2;
  const baseReward = 50 + extraLevels * 10;

  return {
    enemyHealth: Math.round(baseHealth * multipliers.health),
    enemyDamage: Math.round(baseDamage * multipliers.damage),
    rewardCoins: Math.round(baseReward * multipliers.reward),
  };
}
