import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { RatingScale } from '../../../common/modules/persistence/entities';
import { RatingScaleRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class RatingScaleService extends BaseService<
  RatingScale,
  RatingScaleRepository
> {
  constructor(protected readonly repository: RatingScaleRepository) {
    super(repository);
  }
}
