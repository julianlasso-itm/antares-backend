import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '../../common/modules/persistence';
import {
  KnowledgeGapNotesController,
  KnowledgeGapsController,
} from './controllers';
import { KnowledgeGapNotesService, KnowledgeGapsService } from './services';

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
