import { createGamingRegistry } from '../domains/gaming/gaming.registry';
import type { GamingResult } from '../domains/gaming/gaming.types';
import { createHealthcareRegistry } from '../domains/healthcare/healthcare.registry';
import type { HealthcareResult } from '../domains/healthcare/healthcare.types';
import { createLearningRegistry } from '../domains/learning/learning.registry';
import type { LearningResult } from '../domains/learning/learning.types';
import { createPaymentRegistry } from '../domains/payment/payment.registry';
import type { PaymentResult } from '../domains/payment/payment.types';
import { createPricingRegistry } from '../domains/pricing/pricing.registry';
import type { PricingResult } from '../domains/pricing/pricing.types';
import { createSortingRegistry } from '../domains/sorting/sorting.registry';
import type { SortingResult } from '../domains/sorting/sorting.types';
import { capitalize, formatMoney } from './format';
import { parseNumber, parseNumberList } from './parse';
import type { CardConfig } from './strategy-card';

// One config per domain: how to read the input and how to show the result.
// Choosing the strategy is NOT here; that comes from each registry.

export const paymentCard: CardConfig<number, PaymentResult> = {
  id: 'payment',
  icon: '💳',
  title: 'Payments',
  description: 'Each payment method charges a different fee.',
  input: {
    label: 'Amount to pay',
    hint: 'Any amount from 0, in dollars.',
    defaultValue: '100',
    attributes: { type: 'number', min: '0', step: '0.01', inputmode: 'decimal' },
  },
  registry: createPaymentRegistry(),
  parseInput: (raw) => parseNumber(raw, { min: 0 }),
  formatResult: (result) => [
    { label: 'Fee', value: formatMoney(result.fee) },
    { label: 'Total', value: formatMoney(result.total) },
  ],
};

export const pricingCard: CardConfig<number, PricingResult> = {
  id: 'pricing',
  icon: '🛒',
  title: 'Checkout pricing',
  description: 'Each pricing rule combines a discount and a shipping cost.',
  input: {
    label: 'Cart subtotal',
    hint: 'Any amount from 0, in dollars.',
    defaultValue: '100',
    attributes: { type: 'number', min: '0', step: '0.01', inputmode: 'decimal' },
  },
  registry: createPricingRegistry(),
  parseInput: (raw) => parseNumber(raw, { min: 0 }),
  formatResult: (result) => [
    { label: 'Subtotal', value: formatMoney(result.subtotal) },
    { label: 'Discount', value: `-${formatMoney(result.discount)}` },
    { label: 'Shipping', value: formatMoney(result.shipping) },
    { label: 'Total', value: formatMoney(result.total) },
  ],
};

export const sortingCard: CardConfig<number[], SortingResult> = {
  id: 'sorting',
  icon: '🔢',
  title: 'Sorting',
  description: 'Same result, different algorithm: compare how many steps each one needs.',
  input: {
    label: 'Numbers to sort',
    hint: 'Separate numbers with commas or spaces (up to 100).',
    defaultValue: '5, 1, 4, 2, 8, 9, 3, 7, 6',
    attributes: { type: 'text', inputmode: 'decimal', autocomplete: 'off' },
  },
  registry: createSortingRegistry(),
  parseInput: (raw) => parseNumberList(raw),
  formatResult: (result) => [
    { label: 'Sorted', value: result.sorted.join(', ') },
    { label: 'Comparisons', value: String(result.steps) },
  ],
};

export const learningCard: CardConfig<number, LearningResult> = {
  id: 'learning',
  icon: '📚',
  title: 'Learning',
  description: 'Study methods trade time for retention (illustrative numbers).',
  input: {
    label: 'Number of lessons',
    hint: 'A whole number from 1 to 100.',
    defaultValue: '10',
    attributes: { type: 'number', min: '1', max: '100', step: '1' },
  },
  registry: createLearningRegistry(),
  parseInput: (raw) => parseNumber(raw, { min: 1, max: 100, integer: true }),
  formatResult: (result) => [
    { label: 'Estimated time', value: `${result.estimatedHours} h` },
    { label: 'Retention', value: `${result.retentionScore} / 100` },
  ],
};

export const gamingCard: CardConfig<number, GamingResult> = {
  id: 'gaming',
  icon: '🎮',
  title: 'Game difficulty',
  description: 'Each difficulty scales the enemy and the reward differently.',
  input: {
    label: 'Level',
    hint: 'A whole number from 1 to 100.',
    defaultValue: '1',
    attributes: { type: 'number', min: '1', max: '100', step: '1' },
  },
  registry: createGamingRegistry(),
  parseInput: (raw) => parseNumber(raw, { min: 1, max: 100, integer: true }),
  formatResult: (result) => [
    { label: 'Enemy health', value: `${result.enemyHealth} HP` },
    { label: 'Enemy damage', value: `${result.enemyDamage} per hit` },
    { label: 'Reward', value: `${result.rewardCoins} coins` },
  ],
};

export const healthcareCard: CardConfig<number, HealthcareResult> = {
  id: 'healthcare',
  icon: '🏥',
  title: 'Healthcare',
  description:
    'Treatments differ in cost, recovery and risk. Fictional numbers, not medical advice.',
  input: {
    label: 'Severity',
    hint: 'A whole number from 1 (mild) to 10 (severe).',
    defaultValue: '5',
    attributes: { type: 'number', min: '1', max: '10', step: '1' },
  },
  registry: createHealthcareRegistry(),
  parseInput: (raw) => parseNumber(raw, { min: 1, max: 10, integer: true }),
  formatResult: (result) => [
    { label: 'Cost', value: formatMoney(result.cost) },
    { label: 'Recovery', value: `${result.recoveryDays} days` },
    { label: 'Risk', value: capitalize(result.riskLevel) },
  ],
};
