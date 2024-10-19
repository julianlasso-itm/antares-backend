import { BaseService } from '@common/services/service.abstract';
import { Assessments } from '@entities/assessments/assessments.entity';
import { Injectable } from '@nestjs/common';
import AssessmentsRepository from '@repositories/assessments/assessments.repository';

@Injectable()
export class AssessmentsService extends BaseService<
  Assessments,
  AssessmentsRepository
> {
  constructor(protected readonly repository: AssessmentsRepository) {
    super(repository);
  }
}
