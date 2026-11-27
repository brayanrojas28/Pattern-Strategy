import type { IDifficultyStrategy } from "../core/gaming.strategy";

export class MediumStrategy implements IDifficultyStrategy {
    play(player: string): string {
        return `El jugador ${player} escogio la dificultad media.`;
    }
}
