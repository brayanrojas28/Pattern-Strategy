import type { ITreatmentStrategy } from '../core/treatment.strategy';

export class SurgeryStrategy implements ITreatmentStrategy {
  applyTreatment(patient: string): string {
    return `El paciente ${patient} se tratara con una cirugia :(`;
  }
}
