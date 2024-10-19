import { BaseService } from '@common/services/service.abstract';
import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { Injectable } from '@nestjs/common';
import KnowledgeGapsRepository from '@repositories/knowledge-gaps/knowledge-gaps.repository';

@Injectable()
export class KnowledgeGapsService extends BaseService<
  KnowledgeGaps,
  KnowledgeGapsRepository
> {
  constructor(protected readonly repository: KnowledgeGapsRepository) {
    super(repository);
  }
}
