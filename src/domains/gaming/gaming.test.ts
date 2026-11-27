import { describe, expect, it } from 'vitest';
import { createGamingRegistry } from './gaming.registry';
import { EasyStrategy } from './strategies/easy.strategy';
import { HardStrategy } from './strategies/hard.strategy';
import { MediumStrategy } from './strategies/medium.strategy';

describe('gaming strategies', () => {
  it('MediumStrategy uses the base stats of the level', () => {
    expect(new MediumStrategy().execute(1)).toEqual({
      enemyHealth: 100,
      enemyDamage: 10,
      rewardCoins: 50,
    });
    expect(new MediumStrategy().execute(3)).toEqual({
      enemyHealth: 140,
      enemyDamage: 14,
      rewardCoins: 70,
    });
  });

  it('EasyStrategy makes enemies weaker and rewards smaller', () => {
    expect(new EasyStrategy().execute(1)).toEqual({
      enemyHealth: 75,
      enemyDamage: 5,
      rewardCoins: 40,
    });
  });

  it('HardStrategy makes enemies stronger and doubles rewards', () => {
    expect(new HardStrategy().execute(1)).toEqual({
      enemyHealth: 150,
      enemyDamage: 18,
      rewardCoins: 100,
    });
  });
});

describe('gaming registry', () => {
  it('registers every difficulty', () => {
    expect(createGamingRegistry().keys()).toEqual(['easy', 'medium', 'hard']);
  });
});
