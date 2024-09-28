export interface IErrorResponse {
  message: string;
  statusCode: string;
}

export class ResponseDto<T> {
  constructor(
    public readonly value: T,
    public readonly error?: IErrorResponse,
  ) {}

  static ok<T>(value: T): ResponseDto<T> {
    return new ResponseDto(value);
  }

  static err<T>(error: IErrorResponse): ResponseDto<T> {
    return new ResponseDto(null as any, error);
  }
}
