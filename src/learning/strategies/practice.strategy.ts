import type { ILearningStrategy } from "../core/learning.strategy";

export class PracticeStrategy implements ILearningStrategy {
    learn(material: string): string {
        return `Aprendiendo ${material} mediante Ejercicios Precticos.`;
    }
}