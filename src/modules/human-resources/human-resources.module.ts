import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '@persistence/persistence.module';
import { ProfessionalsController } from './controllers/professionals.controller';
import { ProfessionalsService } from './services/professionals.service';

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
