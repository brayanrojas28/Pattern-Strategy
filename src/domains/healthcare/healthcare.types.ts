import type { Strategy } from '../../shared/strategy';

// All numbers in this domain are made up for teaching. They are not medical advice.

export type RiskLevel = 'low' | 'medium' | 'high';

export interface HealthcareResult {
  cost: number;
  recoveryDays: number;
  riskLevel: RiskLevel;
}

/** ROLE: Strategy. Input: how severe the condition is, from 1 (mild) to 10 (severe). */
export interface HealthcareStrategy extends Strategy<number, HealthcareResult> {}
