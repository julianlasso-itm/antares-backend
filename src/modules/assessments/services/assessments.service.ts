import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { Assessments } from '../../../common/modules/persistence/entities';
import { AssessmentsRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class AssessmentsService extends BaseService<
  Assessments,
  AssessmentsRepository
> {
  constructor(protected readonly repository: AssessmentsRepository) {
    super(repository);
  }
}
