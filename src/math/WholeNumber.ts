export class WholeNumber {
  private readonly _value: number;
  public static readonly Zero: WholeNumber = new WholeNumber(0);

  public constructor(value: number) {
    if (Math.round(value) !== value) throw new Error("Not an integer");

    this._value = WholeNumber.RestoreZeroNegative(value);
  }

  public Decrement() {
    return new WholeNumber(this._value - 1);
  }

  private static RestoreZeroNegative(number: number) {
    if (number == -0) return 0;
    return number;
  }

  Increment() {
    return new WholeNumber(this._value + 1);
  }

  Modulo(other: WholeNumber) {
    const otherValue = other._value;

    const valueReducedSigned = (this._value % otherValue) % -otherValue;
    const unsignedValue = valueReducedSigned + otherValue;
    const unsignedReducedValue = unsignedValue % otherValue;

    return new WholeNumber(unsignedReducedValue);
  }
}
