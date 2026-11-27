import type { IDifficultyStrategy } from '../core/gaming.strategy';

export class EasyStrategy implements IDifficultyStrategy {
  play(player: string): string {
    return `El jugador ${player} escogio la dificultad facil.`;
  }
}
