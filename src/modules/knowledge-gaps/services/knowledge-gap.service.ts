import { Injectable } from '@nestjs/common';
import { KnowledgeGaps } from '../../../common/modules/persistence/entities';
import { KnowledgeGapsRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class KnowledgeGapsService extends BaseService<
  KnowledgeGaps,
  KnowledgeGapsRepository
> {
  constructor(protected readonly repository: KnowledgeGapsRepository) {
    super(repository);
  }
}
