import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { DomainAssessmentScores } from '../../../common/modules/persistence/entities';
import { DomainAssessmentScoresRepository } from '../../../common/modules/persistence/repositories';

@Injectable()
export class DomainAssessmentScoresService extends BaseService<
  DomainAssessmentScores,
  DomainAssessmentScoresRepository
> {
  constructor(protected readonly repository: DomainAssessmentScoresRepository) {
    super(repository);
  }
}
