import { DomainKnowledgeLevels } from '@entities/assessments/domain-knowledge-levels.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class DomainKnowledgeLevelsRepository extends BaseRepository<DomainKnowledgeLevels> {
  constructor(
    @InjectRepository(DomainKnowledgeLevels)
    readonly repository: Repository<DomainKnowledgeLevels>,
  ) {
    super(repository);
  }
}

export default DomainKnowledgeLevelsRepository;
