import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class DomainKnowledgeRepository extends BaseRepository<DomainKnowledge> {
  constructor(
    @InjectRepository(DomainKnowledge)
    readonly repository: Repository<DomainKnowledge>,
  ) {
    super(repository);
  }
}

export default DomainKnowledgeRepository;
