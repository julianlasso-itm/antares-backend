import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '@persistence/persistence.module';
import { TechnologyItemsController } from './controllers/technology-items.controller';
import { TechnologyTypesController } from './controllers/technology-types.controller';
import { TechnologyItemsService } from './services/technology-items.service';
import { TechnologyTypesService } from './services/technology-types.service';

@Module({
  imports: [
    PersistenceModule,
    RouterModule.register([
      {
        path: 'technologies',
        module: TechnologiesModule,
      },
    ]),
  ],
  controllers: [TechnologyItemsController, TechnologyTypesController],
  providers: [TechnologyItemsService, TechnologyTypesService],
})
export class TechnologiesModule {}
