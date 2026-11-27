import type { ITreatmentStrategy } from '../core/treatment.strategy';

export class MedicationStrategy implements ITreatmentStrategy {
    applyTreatment(patient: string): string {
        return `El paciente ${patient} se tratara con medicamentos.`;
    }
}