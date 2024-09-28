import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { DomainKnowledge } from '../../../common/modules/persistence/entities';
import { DomainKnowledgeRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class DomainKnowledgeService extends BaseService<
  DomainKnowledge,
  DomainKnowledgeRepository
> {
  constructor(protected readonly repository: DomainKnowledgeRepository) {
    super(repository);
  }
}
