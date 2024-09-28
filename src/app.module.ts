import { Module } from '@nestjs/common';
import {
  AssessmentsModule,
  HumanResourcesModule,
  KnowledgeGapsModule,
  ProjectsManagementModule,
  TechnologiesModule,
} from './modules';

@Module({
  imports: [
    AssessmentsModule,
    HumanResourcesModule,
    KnowledgeGapsModule,
    ProjectsManagementModule,
    TechnologiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
