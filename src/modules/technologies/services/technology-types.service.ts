import { BaseService } from '@common/services/service.abstract';
import { TechnologyTypes } from '@entities/technologies/technology-types.entity';
import { Injectable } from '@nestjs/common';
import TechnologyTypesRepository from '@repositories/technologies/technology-types.repository';

@Injectable()
export class TechnologyTypesService extends BaseService<
  TechnologyTypes,
  TechnologyTypesRepository
> {
  constructor(protected readonly repository: TechnologyTypesRepository) {
    super(repository);
  }
}
