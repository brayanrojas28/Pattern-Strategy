// Imports de Pagos
import { PaymentContext } from './domains/payment/core/payment.context';
import { CardStrategy } from './domains/payment/strategies/card.strategy';
import { NequiStrategy } from './domains/payment/strategies/nequi.strategy';
import { PaypalStrategy } from './domains/payment/strategies/paypal.strategy';

// Imports de Aprendizaje
import { LearningContext } from './domains/learning/core/learning.context';
import { VideoStrategy } from './domains/learning/strategies/video.strategy';
import { ReadingStrategy } from './domains/learning/strategies/reading.strategy';
import { PracticeStrategy } from './domains/learning/strategies/practice.strategy';

// Imports de Gaming
import { GameContext } from './domains/gaming/core/gaming.context';
import { EasyStrategy } from './domains/gaming/strategies/easy.strategy';
import { MediumStrategy } from './domains/gaming/strategies/medium.strategy';
import { HardStrategy } from './domains/gaming/strategies/hard.strategy';

// Imports de Healthcare
import { TreatmentContext } from './domains/healthcare/core/treatment.context';
import { MedicationStrategy } from './domains/healthcare/strategies/medication.strategy';
import { SurgeryStrategy } from './domains/healthcare/strategies/surgery.strategy';
import { TherapyStrategy } from './domains/healthcare/strategies/therapy.strategy';

// --- Lógica de Pagos ---
document.getElementById('btnPay')?.addEventListener('click', () => {
  const amount = Number((document.getElementById('payAmount') as HTMLInputElement).value);
  const strategyType = (document.getElementById('payStrategy') as HTMLSelectElement).value;

  let strategy = new CardStrategy();
  if (strategyType === 'nequi') strategy = new NequiStrategy();
  if (strategyType === 'paypal') strategy = new PaypalStrategy();

  const ctx = new PaymentContext(strategy);
  const output = document.getElementById('payResult');
  if (output) output.innerText = ctx.execute(amount);
});

// --- Lógica de Aprendizaje ---
document.getElementById('btnLearn')?.addEventListener('click', () => {
  const topic = (document.getElementById('learnTopic') as HTMLInputElement).value;
  const strategyType = (document.getElementById('learnStrategy') as HTMLSelectElement).value;

  let strategy = new VideoStrategy();
  if (strategyType === 'reading') strategy = new ReadingStrategy();
  if (strategyType === 'practice') strategy = new PracticeStrategy();

  const ctx = new LearningContext(strategy);
  const output = document.getElementById('learnResult');
  if (output) output.innerText = ctx.execute(topic);
});

// --- Lógica de Gaming ---
document.getElementById('btnGame')?.addEventListener('click', () => {
  const name = (document.getElementById('playerName') as HTMLInputElement).value;
  const strategyType = (document.getElementById('gameStrategy') as HTMLSelectElement).value;

  let strategy = new EasyStrategy();
  if (strategyType === 'medium') strategy = new MediumStrategy();
  if (strategyType === 'hard') strategy = new HardStrategy();

  const ctx = new GameContext(strategy);
  const output = document.getElementById('gameResult');
  if (output) output.innerText = ctx.execute(name);
});

// --- Lógica de Healthcare ---
document.getElementById('btnMedicine')?.addEventListener('click', () => {
  const name = (document.getElementById('patientName') as HTMLInputElement).value;
  const strategyType = (document.getElementById('trearmentStrategy') as HTMLSelectElement).value;

  let strategy = new MedicationStrategy();
  if (strategyType === 'surgery') strategy = new SurgeryStrategy();
  if (strategyType === 'therapy') strategy = new TherapyStrategy();

  const ctx = new TreatmentContext(strategy);
  const output = document.getElementById('treatmenResult');
  if (output) output.innerText = ctx.execute(name);
});
