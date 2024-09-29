import { BadRequestException } from '@nestjs/common';
import { ResponseDto } from '../dto';
import { Result } from './result';

export class CrudController {
  static response<Type>(data: Result<Type>): ResponseDto<Type> {
    if (data.isErr) {
      throw new BadRequestException(data.error.message);
    }
    return ResponseDto.ok(data.value);
  }
}
