import { BaseService } from '@common/services/service.abstract';
import { DomainAssessmentScores } from '@entities/assessments/domain-assessment-scores.entity';
import { Injectable } from '@nestjs/common';
import DomainAssessmentScoresRepository from '@repositories/assessments/domain-assessment-scores.repository';

@Injectable()
export class DomainAssessmentScoresService extends BaseService<
  DomainAssessmentScores,
  DomainAssessmentScoresRepository
> {
  constructor(protected readonly repository: DomainAssessmentScoresRepository) {
    super(repository);
  }
}
