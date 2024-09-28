import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeGapNotes } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class KnowledgeGapNotesRepository extends BaseRepository<KnowledgeGapNotes> {
  constructor(
    @InjectRepository(KnowledgeGapNotes)
    protected readonly repository: Repository<KnowledgeGapNotes>,
  ) {
    super(repository);
  }
}

export default KnowledgeGapNotesRepository;
