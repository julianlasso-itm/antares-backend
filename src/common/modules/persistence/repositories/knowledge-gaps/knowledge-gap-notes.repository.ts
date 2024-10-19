import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class KnowledgeGapNotesRepository extends BaseRepository<KnowledgeGapNotes> {
  constructor(
    @InjectRepository(KnowledgeGapNotes)
    readonly repository: Repository<KnowledgeGapNotes>,
  ) {
    super(repository);
  }
}

export default KnowledgeGapNotesRepository;
