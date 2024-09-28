import { Injectable } from '@nestjs/common';
import { RatingScale } from '../../../common/modules/persistence/entities';
import { RatingScaleRepository } from '../../../common/modules/persistence/repositories/assessments';
import { BaseService } from './service.abstract';

@Injectable()
export class RatingScaleService extends BaseService<
  RatingScale,
  RatingScaleRepository
> {
  constructor(protected readonly repository: RatingScaleRepository) {
    super(repository);
  }
}
