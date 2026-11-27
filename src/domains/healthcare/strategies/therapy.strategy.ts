import type { HealthcareResult, HealthcareStrategy } from '../healthcare.types';

/** ROLE: Concrete Strategy. Priced per session: low risk, but the slowest recovery. */
export class TherapyStrategy implements HealthcareStrategy {
  readonly label = 'Therapy';

  private readonly pricePerSession = 80;

  execute(severity: number): HealthcareResult {
    const sessions = severity * 2;
    return {
      cost: sessions * this.pricePerSession,
      recoveryDays: severity * 7,
      riskLevel: 'low',
    };
  }
}
