import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '../../common/modules/persistence';
import { ProfessionalsController } from './controllers';
import { ProfessionalsService } from './services';

@Module({
  imports: [
    PersistenceModule,
    RouterModule.register([
      {
        path: 'human-resources',
        module: HumanResourcesModule,
      },
    ]),
  ],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class HumanResourcesModule {}
