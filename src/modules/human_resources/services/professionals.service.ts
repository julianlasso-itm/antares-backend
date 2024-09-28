import { Injectable } from '@nestjs/common';
import { Professionals } from '../../../common/modules/persistence/entities';
import { ProfessionalsRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common';

@Injectable()
export class ProfessionalsService extends BaseService<
  Professionals,
  ProfessionalsRepository
> {
  constructor(protected readonly repository: ProfessionalsRepository) {
    super(repository);
  }
}
