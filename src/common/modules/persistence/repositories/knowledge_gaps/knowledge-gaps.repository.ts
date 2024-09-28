import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeGaps } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class KnowledgeGapsRepository extends BaseRepository<KnowledgeGaps> {
  constructor(
    @InjectRepository(KnowledgeGaps)
    protected readonly repository: Repository<KnowledgeGaps>,
  ) {
    super(repository);
  }
}

export default KnowledgeGapsRepository;
