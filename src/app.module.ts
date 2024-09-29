import { Module } from '@nestjs/common';
import {
  AssessmentsModule,
  HumanResourcesModule,
  KnowledgeGapsModule,
  ProjectsManagementModule,
  TechnologiesModule,
} from './modules';
import { SecurityModule } from './modules/security';

@Module({
  imports: [
    AssessmentsModule,
    HumanResourcesModule,
    KnowledgeGapsModule,
    ProjectsManagementModule,
    TechnologiesModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
