import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingScale } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class RatingScaleRepository extends BaseRepository<RatingScale> {
  constructor(
    @InjectRepository(RatingScale)
    protected readonly repository: Repository<RatingScale>,
  ) {
    super(repository);
  }
}

export default RatingScaleRepository;
