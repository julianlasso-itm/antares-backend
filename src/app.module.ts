import { Module } from '@nestjs/common';
import {
  AssessmentsModule,
  HumanResourcesModule,
  KnowledgeGapsModule,
} from './modules';
import { TechnologiesModule } from './modules/technologies';

@Module({
  imports: [
    AssessmentsModule,
    HumanResourcesModule,
    KnowledgeGapsModule,
    TechnologiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
