import { Injectable } from '@nestjs/common';
import { TechnologyStack } from '../../../common/modules/persistence/entities';
import { TechnologyStackRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class TechnologyStackService extends BaseService<
  TechnologyStack,
  TechnologyStackRepository
> {
  constructor(protected readonly repository: TechnologyStackRepository) {
    super(repository);
  }
}
