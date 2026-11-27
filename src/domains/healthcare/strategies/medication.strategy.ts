import type { HealthcareResult, HealthcareStrategy } from '../healthcare.types';

/** ROLE: Concrete Strategy. Cheap and low risk, unless the case is severe. */
export class MedicationStrategy implements HealthcareStrategy {
  readonly label = 'Medication';

  execute(severity: number): HealthcareResult {
    return {
      cost: 50 + severity * 20,
      recoveryDays: severity * 3,
      riskLevel: severity >= 8 ? 'medium' : 'low',
    };
  }
}
