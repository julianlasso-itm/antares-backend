import { AssessmentsModule } from '@assessments/assessments.module';
import { HumanResourcesModule } from '@human-resources/human-resources.module';
import { KnowledgeGapsModule } from '@knowledge-gaps/knowledge-gaps.module';
import { Module } from '@nestjs/common';
import { ProjectsManagementModule } from '@projects-management/projects-management.module';
import { SecurityModule } from '@security/security.module';
import { TechnologiesModule } from '@technologies/technologies.module';

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
