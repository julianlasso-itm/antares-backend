import { DomainAssessmentScores } from '@entities/assessments/domain-assessment-scores.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class DomainAssessmentScoresRepository extends BaseRepository<DomainAssessmentScores> {
  constructor(
    @InjectRepository(DomainAssessmentScores)
    readonly repository: Repository<DomainAssessmentScores>,
  ) {
    super(repository);
  }
}

export default DomainAssessmentScoresRepository;
