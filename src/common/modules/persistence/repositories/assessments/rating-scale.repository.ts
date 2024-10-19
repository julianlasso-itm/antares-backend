import { RatingScale } from '@entities/assessments/rating-scale.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class RatingScaleRepository extends BaseRepository<RatingScale> {
  constructor(
    @InjectRepository(RatingScale)
    readonly repository: Repository<RatingScale>,
  ) {
    super(repository);
  }
}

export default RatingScaleRepository;
