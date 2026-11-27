import { describe, expect, it } from 'vitest';
import { createHealthcareRegistry } from './healthcare.registry';
import { MedicationStrategy } from './strategies/medication.strategy';
import { SurgeryStrategy } from './strategies/surgery.strategy';
import { TherapyStrategy } from './strategies/therapy.strategy';

describe('healthcare strategies', () => {
  it('MedicationStrategy is cheap and low risk for moderate cases', () => {
    expect(new MedicationStrategy().execute(5)).toEqual({
      cost: 150,
      recoveryDays: 15,
      riskLevel: 'low',
    });
  });

  it('MedicationStrategy becomes medium risk for severe cases', () => {
    expect(new MedicationStrategy().execute(8).riskLevel).toBe('medium');
  });

  it('SurgeryStrategy is expensive and its risk grows with severity', () => {
    expect(new SurgeryStrategy().execute(5)).toEqual({
      cost: 7500,
      recoveryDays: 24,
      riskLevel: 'medium',
    });
    expect(new SurgeryStrategy().execute(7).riskLevel).toBe('high');
  });

  it('TherapyStrategy charges per session and is always low risk', () => {
    expect(new TherapyStrategy().execute(5)).toEqual({
      cost: 800,
      recoveryDays: 35,
      riskLevel: 'low',
    });
    expect(new TherapyStrategy().execute(10).riskLevel).toBe('low');
  });
});

describe('healthcare registry', () => {
  it('registers every treatment', () => {
    expect(createHealthcareRegistry().keys()).toEqual(['medication', 'surgery', 'therapy']);
  });
});
