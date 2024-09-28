import { Module } from '@nestjs/common';
import {
  AssessmentsModule,
  HumanResourcesModule,
  KnowledgeGapsModule,
} from './modules';

@Module({
  imports: [AssessmentsModule, HumanResourcesModule, KnowledgeGapsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
