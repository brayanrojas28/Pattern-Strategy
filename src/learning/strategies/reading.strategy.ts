import type{ ILearningStrategy } from "../core/learning.strategy";

export class ReadingStrategy implements ILearningStrategy {
    learn(material: string): string {
        return `Aprendiendo ${material} mediante documentos.`;
    }
}