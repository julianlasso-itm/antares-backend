export class DocumentBadRequestArrayException {
  message: Array<{ field: string; error: string }>;
  error: string;
  statusCode: number;
}

export class DocumentBadRequestStringException {
  message: string;
  error: string;
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
