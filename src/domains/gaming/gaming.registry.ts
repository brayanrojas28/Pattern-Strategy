import { StrategyRegistry } from '../../shared/strategy-registry';
import type { GamingResult } from './gaming.types';
import { EasyStrategy } from './strategies/easy.strategy';
import { HardStrategy } from './strategies/hard.strategy';
import { MediumStrategy } from './strategies/medium.strategy';

export function createGamingRegistry(): StrategyRegistry<number, GamingResult> {
  return new StrategyRegistry<number, GamingResult>()
    .register('easy', new EasyStrategy())
    .register('medium', new MediumStrategy())
    .register('hard', new HardStrategy());
}
