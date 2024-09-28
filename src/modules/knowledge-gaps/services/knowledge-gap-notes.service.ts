import { Injectable } from '@nestjs/common';
import { KnowledgeGapNotes } from '../../../common/modules/persistence/entities';
import { KnowledgeGapNotesRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common';

@Injectable()
export class KnowledgeGapNotesService extends BaseService<
  KnowledgeGapNotes,
  KnowledgeGapNotesRepository
> {
  constructor(protected readonly repository: KnowledgeGapNotesRepository) {
    super(repository);
  }
}
