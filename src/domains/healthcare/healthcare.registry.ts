import { StrategyRegistry } from '../../shared/strategy-registry';
import type { HealthcareResult } from './healthcare.types';
import { MedicationStrategy } from './strategies/medication.strategy';
import { SurgeryStrategy } from './strategies/surgery.strategy';
import { TherapyStrategy } from './strategies/therapy.strategy';

export function createHealthcareRegistry(): StrategyRegistry<number, HealthcareResult> {
  return new StrategyRegistry<number, HealthcareResult>()
    .register('medication', new MedicationStrategy())
    .register('surgery', new SurgeryStrategy())
    .register('therapy', new TherapyStrategy());
}
