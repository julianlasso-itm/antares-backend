import { Injectable } from '@nestjs/common';
import { DomainQuestionsAnswers } from '../../../common/modules/persistence/entities';
import { DomainQuestionsAnswersRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from './service.abstract';

@Injectable()
export class DomainQuestionsAnswersService extends BaseService<
  DomainQuestionsAnswers,
  DomainQuestionsAnswersRepository
> {
  constructor(protected readonly repository: DomainQuestionsAnswersRepository) {
    super(repository);
  }
}
