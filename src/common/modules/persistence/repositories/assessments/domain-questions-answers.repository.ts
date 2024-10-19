import { DomainQuestionsAnswers } from '@entities/assessments/domain-questions-answers.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class DomainQuestionsAnswersRepository extends BaseRepository<DomainQuestionsAnswers> {
  constructor(
    @InjectRepository(DomainQuestionsAnswers)
    readonly repository: Repository<DomainQuestionsAnswers>,
  ) {
    super(repository);
  }
}

export default DomainQuestionsAnswersRepository;
