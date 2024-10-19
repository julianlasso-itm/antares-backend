import AntaresException from '@common/exceptions/antares.exception';

class Result<Type> {
  readonly value: Type;
  readonly error: AntaresException;
  readonly isOk: boolean;
  readonly isErr: boolean;

  private constructor(value: Type, error: AntaresException, isOk: boolean) {
    this.value = value;
    this.error = error;
    this.isOk = isOk;
    this.isErr = !this.isOk;
  }

  static ok<Type>(value: Type): Result<Type> {
    return new Result<Type>(value, null as any, true);
  }

  static err<Type>(error: AntaresException): Result<Type> {
    return new Result<Type>(null as any, error, false);
  }
}

export default Result;
