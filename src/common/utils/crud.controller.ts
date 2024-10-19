import { ResponseDto } from '@common/dto/response.dto';
import { BadRequestException } from '@nestjs/common';
import Result from './result/result.util';

export class CrudController {
  static response<Type>(data: Result<Type>): ResponseDto<Type> {
    if (data.isErr) {
      throw new BadRequestException(data.error.message);
    }
    return ResponseDto.ok(data.value);
  }
}
