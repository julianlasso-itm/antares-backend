import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyItems } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class TechnologyItemsRepository extends BaseRepository<TechnologyItems> {
  constructor(
    @InjectRepository(TechnologyItems)
    readonly repository: Repository<TechnologyItems>,
  ) {
    super(repository);
  }
}

export default TechnologyItemsRepository;
