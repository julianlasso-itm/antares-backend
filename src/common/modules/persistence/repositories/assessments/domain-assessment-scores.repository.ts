import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainAssessmentScores } from '../../entities';
import { BaseRepository } from '../repository.abstract';

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
