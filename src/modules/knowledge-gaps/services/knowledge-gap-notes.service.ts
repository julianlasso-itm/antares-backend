import { BaseService } from '@common/services/service.abstract';
import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { Injectable } from '@nestjs/common';
import KnowledgeGapNotesRepository from '@repositories/knowledge-gaps/knowledge-gap-notes.repository';

@Injectable()
export class KnowledgeGapNotesService extends BaseService<
  KnowledgeGapNotes,
  KnowledgeGapNotesRepository
> {
  constructor(protected readonly repository: KnowledgeGapNotesRepository) {
    super(repository);
  }
}
