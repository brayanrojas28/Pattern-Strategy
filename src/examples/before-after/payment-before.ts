import { roundToCents } from '../../shared/money';

/**
 * BEFORE: one function knows every payment method.
 *
 * It works, but every new method means opening this function and adding
 * another branch, and you can only test a method by going through all of it.
 */
export function calculatePayment(method: string, amount: number): { fee: number; total: number } {
  let fee: number;

  if (method === 'card') {
    fee = roundToCents(amount * 0.029 + 0.3);
  } else if (method === 'paypal') {
    fee = roundToCents(amount * 0.035);
  } else if (method === 'nequi') {
    fee = 0;
  } else {
    throw new Error(`Unknown payment method "${method}".`);
  }

  return { fee, total: roundToCents(amount + fee) };
}
