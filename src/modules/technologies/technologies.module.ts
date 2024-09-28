import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '../../common/modules/persistence';
import {
  TechnologyItemsController,
  TechnologyTypesController,
} from './controllers';
import { TechnologyItemsService, TechnologyTypesService } from './services';

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
