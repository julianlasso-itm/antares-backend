import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainKnowledgeLevels } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class DomainKnowledgeLevelsRepository extends BaseRepository<DomainKnowledgeLevels> {
  constructor(
    @InjectRepository(DomainKnowledgeLevels)
    protected readonly repository: Repository<DomainKnowledgeLevels>,
  ) {
    super(repository);
  }
}

export default DomainKnowledgeLevelsRepository;
