import type { Strategy } from '../../shared/strategy';

export interface GamingResult {
  enemyHealth: number;
  enemyDamage: number;
  /** Coins the player earns for beating the enemy. */
  rewardCoins: number;
}

/** ROLE: Strategy. Input: the level the player is on (1 or more). */
export interface GamingStrategy extends Strategy<number, GamingResult> {}
