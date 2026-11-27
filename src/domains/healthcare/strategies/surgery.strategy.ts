import type { HealthcareResult, HealthcareStrategy } from '../healthcare.types';

/** ROLE: Concrete Strategy. Expensive, with a fixed post-op recovery and higher risk. */
export class SurgeryStrategy implements HealthcareStrategy {
  readonly label = 'Surgery';

  execute(severity: number): HealthcareResult {
    return {
      cost: 5000 + severity * 500,
      recoveryDays: 14 + severity * 2,
      riskLevel: severity >= 7 ? 'high' : 'medium',
    };
  }
}
