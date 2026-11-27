export interface IPaymentStrategy {
  pay(amount: number): string;
}
