import type { ILearningStrategy } from "../core/learning.strategy";

export class VideoStrategy implements ILearningStrategy {
    learn(material: string): string {
        return `Aprendiendo ${material} mediante Videos.`;
    }
}