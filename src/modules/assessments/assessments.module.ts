import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '@persistence/persistence.module';
import { AssessmentsController } from './controllers/assessments.controller';
import { ConfigurationLevelsController } from './controllers/configuration-levels.controller';
import { ConfigurationPerLevelController } from './controllers/configuration-per-level.controller';
import { DomainAssessmentScoresController } from './controllers/domain-assessment-scores.controller';
import { DomainKnowledgeLevelsController } from './controllers/domain-knowledge-levels.controller';
import { DomainKnowledgeController } from './controllers/domain-knowledge.controller';
import { DomainQuestionsAnswersController } from './controllers/domain-questions-answers.controller';
import { LevelsController } from './controllers/levels.controller';
import { RatingScaleController } from './controllers/rating-scale.controller';
import { AssessmentsService } from './services/assessments.service';
import { ConfigurationLevelsService } from './services/configuration-levels.service';
import { ConfigurationPerLevelService } from './services/configuration-per-level.service';
import { DomainAssessmentScoresService } from './services/domain-assessment-scores.service';
import { DomainKnowledgeLevelsService } from './services/domain-knowledge-levels.service';
import { DomainKnowledgeService } from './services/domain-knowledge.service';
import { DomainQuestionsAnswersService } from './services/domain-questions-answers.service';
import { LevelsService } from './services/levels.service';
import { RatingScaleService } from './services/rating-scale.service';

@Module({
  imports: [
    PersistenceModule,
    RouterModule.register([
      {
        path: 'assessments',
        module: AssessmentsModule,
      },
    ]),
  ],
  controllers: [
    AssessmentsController,
    ConfigurationLevelsController,
    ConfigurationPerLevelController,
    DomainAssessmentScoresController,
    DomainKnowledgeController,
    DomainKnowledgeLevelsController,
    DomainQuestionsAnswersController,
    LevelsController,
    RatingScaleController,
  ],
  providers: [
    AssessmentsService,
    ConfigurationLevelsService,
    ConfigurationPerLevelService,
    DomainAssessmentScoresService,
    DomainKnowledgeLevelsService,
    DomainKnowledgeService,
    DomainQuestionsAnswersService,
    LevelsService,
    RatingScaleService,
  ],
})
export class AssessmentsModule {}
