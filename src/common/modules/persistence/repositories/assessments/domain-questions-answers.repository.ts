import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainQuestionsAnswers } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class DomainQuestionsAnswersRepository extends BaseRepository<DomainQuestionsAnswers> {
  constructor(
    @InjectRepository(DomainQuestionsAnswers)
    protected readonly repository: Repository<DomainQuestionsAnswers>,
  ) {
    super(repository);
  }
}

export default DomainQuestionsAnswersRepository;
