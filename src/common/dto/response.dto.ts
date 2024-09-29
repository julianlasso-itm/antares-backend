import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    description: 'Mensaje de error devuelto por la operación',
    example: 'Mensaje de error',
    required: true,
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Código de error devuelto por la operación',
    example: 'E500',
    required: true,
    type: String,
  })
  statusCode: string;
}

export class ResponseDto<T> {
  @ApiProperty({
    description: 'Valor devuelto por la operación',
    required: true,
  })
  readonly value: T;

  @ApiProperty({
    description: 'Error devuelto por la operación',
    required: false,
    type: ErrorResponse,
  })
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
