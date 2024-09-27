class Result<Type, Error> {
  constructor(
    public readonly value: Type,
    public readonly error: Error,
  ) {}

  static ok<T>(value: T): Result<T, null> {
    return new Result(value, null);
  }

  static err<E>(error: E): Result<null, E> {
    return new Result(null, error);
  }

  isOk(): this is Result<Type, null> {
    return this.error === null;
  }

  isErr(): this is Result<null, Error> {
    return this.value === null;
  }
}

export default Result;
