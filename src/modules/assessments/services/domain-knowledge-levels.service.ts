import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { DomainKnowledgeLevels } from '../../../common/modules/persistence/entities';
import { DomainKnowledgeLevelsRepository } from '../../../common/modules/persistence/repositories';

@Injectable()
export class DomainKnowledgeLevelsService extends BaseService<
  DomainKnowledgeLevels,
  DomainKnowledgeLevelsRepository
> {
  constructor(protected readonly repository: DomainKnowledgeLevelsRepository) {
    super(repository);
  }
}
