import { Injectable } from '@nestjs/common';
import { TechnologyItems } from '../../../common/modules/persistence/entities';
import { TechnologyItemsRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class TechnologyItemsService extends BaseService<
  TechnologyItems,
  TechnologyItemsRepository
> {
  constructor(protected readonly repository: TechnologyItemsRepository) {
    super(repository);
  }
}
