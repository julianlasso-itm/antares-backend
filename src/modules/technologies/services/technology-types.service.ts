import { Injectable } from '@nestjs/common';
import { TechnologyTypes } from '../../../common/modules/persistence/entities';
import { TechnologyTypesRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class TechnologyTypesService extends BaseService<
  TechnologyTypes,
  TechnologyTypesRepository
> {
  constructor(protected readonly repository: TechnologyTypesRepository) {
    super(repository);
  }
}
