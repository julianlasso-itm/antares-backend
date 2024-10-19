import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class KnowledgeGapsRepository extends BaseRepository<KnowledgeGaps> {
  constructor(
    @InjectRepository(KnowledgeGaps)
    readonly repository: Repository<KnowledgeGaps>,
  ) {
    super(repository);
  }
}

export default KnowledgeGapsRepository;
