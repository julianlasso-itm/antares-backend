import { BaseService } from '@common/services/service.abstract';
import { Professionals } from '@entities/human-resources/professionals.entity';
import { Injectable } from '@nestjs/common';
import ProfessionalsRepository from '@repositories/human-resources/professionals.repository';

@Injectable()
export class ProfessionalsService extends BaseService<
  Professionals,
  ProfessionalsRepository
> {
  constructor(protected readonly repository: ProfessionalsRepository) {
    super(repository);
  }
}
