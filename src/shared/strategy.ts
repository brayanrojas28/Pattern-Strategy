/**
 * ROLE: Strategy (the common interface).
 *
 * Every algorithm of a family implements this same small contract,
 * so the Context can run any of them without knowing which one it holds.
 */
export interface Strategy<TInput, TOutput> {
  /** Human-readable name, shown in the UI. */
  readonly label: string;

  /** Runs the algorithm. */
  execute(input: TInput): TOutput;
}
