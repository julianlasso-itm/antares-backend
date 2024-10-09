import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainKnowledge } from '../../entities';
import { BaseRepository } from '../repository.abstract';

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
