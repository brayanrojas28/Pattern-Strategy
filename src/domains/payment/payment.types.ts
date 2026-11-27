import type { Strategy } from '../../shared/strategy';

export interface PaymentResult {
  /** What the payment provider charges. */
  fee: number;
  /** Amount + fee: what the customer pays. */
  total: number;
}

/** ROLE: Strategy. Input: the amount to pay. */
export interface PaymentStrategy extends Strategy<number, PaymentResult> {}
