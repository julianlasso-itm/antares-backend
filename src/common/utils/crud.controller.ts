import { ResponseDto } from '../dto';
import { Result } from './result';

export class CrudController {
  static response<Type>(data: Result<Type>): ResponseDto<Type> {
    if (data.isErr) {
      return ResponseDto.err({
        message: data.error.message,
        statusCode: 'E500',
      });
    }
    return ResponseDto.ok(data.value);
  }
}
