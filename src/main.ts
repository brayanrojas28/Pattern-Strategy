// Imports de Pagos
import { PaymentContext } from "./payment/core/payment.context";
import { CardStrategy } from "./payment/strategies/card.strategy";
import { NequiStrategy } from "./payment/strategies/nequi.strategy";
import { PaypalStrategy } from "./payment/strategies/paypal.strategy";

// Imports de Aprendizaje
import { LearningContext } from "./learning/core/learning.context";
import { VideoStrategy } from "./learning/strategies/video.strategy";
import { ReadingStrategy } from "./learning/strategies/reading.strategy";
import { PracticeStrategy } from "./learning/strategies/practice.strategy";

// Imports de Gaming
import { GameContext } from "./gaming/core/gaming.context";
import { EasyStrategy } from "./gaming/strategies/easy.strategy";
import { MediumStrategy } from "./gaming/strategies/medium.strategy";
import { HardStrategy } from "./gaming/strategies/hard.strategy";

// Imports de Healtcare
import { TreatmentContext } from "./healtcare/core/treatment.context";
import { MedicationStrategy } from "./healtcare/strategy/medication.strategy";
import { SurgeryStrategy } from "./healtcare/strategy/surgery.strategy";
import { TherapyStrategy } from "./healtcare/strategy/therapy.strategy";

// --- Lógica de Pagos ---
document.getElementById('btnPay')?.addEventListener('click', () => {
  const amount = Number((document.getElementById('payAmount') as HTMLInputElement).value);
  const strategyType = (document.getElementById('payStrategy') as HTMLSelectElement).value;
  
  let strategy = new CardStrategy();
  if (strategyType === 'nequi') strategy = new NequiStrategy();
  if (strategyType === 'paypal') strategy = new PaypalStrategy();

  const ctx = new PaymentContext(strategy);
  document.getElementById('payResult')!.innerText = ctx.execute(amount);
});

// --- Lógica de Aprendizaje ---
document.getElementById('btnLearn')?.addEventListener('click', () => {
  const topic = (document.getElementById('learnTopic') as HTMLInputElement).value;
  const strategyType = (document.getElementById('learnStrategy') as HTMLSelectElement).value;
  
  let strategy = new VideoStrategy();
  if (strategyType === 'reading') strategy = new ReadingStrategy();
  if (strategyType === 'practice') strategy = new PracticeStrategy();

  const ctx = new LearningContext(strategy);
  document.getElementById('learnResult')!.innerText = ctx.execute(topic);
});

// --- Lógica de Gaming ---
document.getElementById('btnGame')?.addEventListener('click', () => {
  const name = (document.getElementById('playerName') as HTMLInputElement).value;
  const strategyType = (document.getElementById('gameStrategy') as HTMLSelectElement).value;
  
  let strategy = new EasyStrategy();
  if (strategyType === 'medium') strategy = new MediumStrategy();
  if (strategyType === 'hard') strategy = new HardStrategy();

  const ctx = new GameContext(strategy);
  document.getElementById('gameResult')!.innerText = ctx.execute(name);
});

// --- Lógica de Healtcare ---
document.getElementById('btnMedicine')?.addEventListener('click', () => {
  const name = (document.getElementById('patientName') as HTMLInputElement).value;
  const strategyType = (document.getElementById('trearmentStrategy') as HTMLSelectElement).value;
  
  let strategy = new MedicationStrategy();
  if (strategyType === 'surgery') strategy = new SurgeryStrategy();
  if (strategyType === 'therapy') strategy = new TherapyStrategy();

  const ctx = new TreatmentContext(strategy);
  document.getElementById('treatmenResult')!.innerText = ctx.execute(name);
});