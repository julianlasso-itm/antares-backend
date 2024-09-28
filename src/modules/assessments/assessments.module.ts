import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../common/modules/persistence';
import {
  AssessmentsController,
  ConfigurationLevelsController,
  ConfigurationPerLevelController,
  DomainAssessmentScoresController,
  DomainKnowledgeController,
  DomainKnowledgeLevelsController,
  DomainQuestionsAnswersController,
  LevelsController,
  RatingScaleController,
} from './controllers';
import {
  AssessmentsService,
  ConfigurationLevelsService,
  ConfigurationPerLevelService,
  DomainAssessmentScoresService,
  DomainKnowledgeLevelsService,
  DomainKnowledgeService,
  DomainQuestionsAnswersService,
  LevelsService,
  RatingScaleService,
} from './services';

@Module({
  imports: [PersistenceModule],
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
