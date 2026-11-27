import { Context } from './shared/context';
import type { StrategyRegistry } from './shared/strategy-registry';
import { createGamingRegistry } from './domains/gaming/gaming.registry';
import { createHealthcareRegistry } from './domains/healthcare/healthcare.registry';
import { createLearningRegistry } from './domains/learning/learning.registry';
import { createPaymentRegistry } from './domains/payment/payment.registry';

function wireCard<TOutput>(
  ids: { input: string; select: string; button: string; result: string },
  registry: StrategyRegistry<number, TOutput>,
): void {
  const input = document.getElementById(ids.input) as HTMLInputElement;
  const select = document.getElementById(ids.select) as HTMLSelectElement;
  const output = document.getElementById(ids.result) as HTMLElement;
  const context = new Context(registry.get(select.value));

  select.addEventListener('change', () => context.setStrategy(registry.get(select.value)));
  document.getElementById(ids.button)?.addEventListener('click', () => {
    output.innerText = JSON.stringify(context.execute(Number(input.value)));
  });
}

wireCard(
  { input: 'payAmount', select: 'payStrategy', button: 'btnPay', result: 'payResult' },
  createPaymentRegistry(),
);
wireCard(
  { input: 'learnLessons', select: 'learnStrategy', button: 'btnLearn', result: 'learnResult' },
  createLearningRegistry(),
);
wireCard(
  { input: 'gameLevel', select: 'gameStrategy', button: 'btnGame', result: 'gameResult' },
  createGamingRegistry(),
);
wireCard(
  {
    input: 'severity',
    select: 'treatmentStrategy',
    button: 'btnMedicine',
    result: 'treatmentResult',
  },
  createHealthcareRegistry(),
);
