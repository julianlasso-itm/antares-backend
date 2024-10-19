import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

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
