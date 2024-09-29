import { ApiProperty } from '@nestjs/swagger';

export class DocumentBadRequestArrayException {
  @ApiProperty({
    description: 'Lista de errores encontrados',
    example: [
      {
        field: 'name',
        error: 'name must be longer than or equal to 5 characters',
      },
    ],
    type: Array,
  })
  message: Array<{ field: string; error: string }>;

  @ApiProperty({
    description: 'Mensaje de error',
    example: 'Bad Request',
    type: String,
  })
  error: string;

  @ApiProperty({
    description: 'Código de error',
    example: 400,
    type: Number,
  })
  statusCode: number;
}

export class DocumentBadRequestStringException {
  @ApiProperty({
    description: 'Mensaje del error detallado',
    example: 'name is already registered',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Mensaje de error',
    example: 'Bad Request',
    type: String,
  })
  error: string;

  @ApiProperty({
    description: 'Código de error',
    example: 400,
    type: Number,
  })
  statusCode: number;
}

export const arrayExample = {
  value: {
    message: [
      {
        field: 'name',
        error: 'name must be longer than or equal to 5 characters',
      },
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
  summary: 'Salida con array de errores',
};

export const stringExample = {
  value: {
    message: 'name is already registered',
    error: 'Bad Request',
    statusCode: 400,
  },
  summary: 'Salida con cadena de caracteres',
};

export const fullExamples = {
  Array: arrayExample,
  String: stringExample,
};
