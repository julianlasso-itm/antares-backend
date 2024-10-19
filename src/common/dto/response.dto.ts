export class ErrorResponse {
  message: string;

  statusCode: string;
}

export class ResponseDto<T> {
  readonly value: T;

  readonly error?: ErrorResponse;

  constructor(value: T, error?: ErrorResponse) {
    this.value = value;
    this.error = error;
  }

  static ok<T>(value: T): ResponseDto<T> {
    return new ResponseDto(value);
  }

  static err<T>(error: ErrorResponse): ResponseDto<T> {
    return new ResponseDto(null as any, error);
  }
}
