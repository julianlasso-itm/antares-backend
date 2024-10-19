import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '@persistence/persistence.module';
import { KnowledgeGapNotesController } from './controllers/knowledge-gap-notes.controller';
import { KnowledgeGapsController } from './controllers/knowledge-gap.controller';
import { KnowledgeGapNotesService } from './services/knowledge-gap-notes.service';
import { KnowledgeGapsService } from './services/knowledge-gap.service';

@Module({
  imports: [
    PersistenceModule,
    RouterModule.register([
      {
        path: 'knowledge-gaps',
        module: KnowledgeGapsModule,
      },
    ]),
  ],
  controllers: [KnowledgeGapsController, KnowledgeGapNotesController],
  providers: [KnowledgeGapsService, KnowledgeGapNotesService],
})
export class KnowledgeGapsModule {}
