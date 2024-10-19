import { TechnologyTypes } from '@entities/technologies/technology-types.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class TechnologyTypesRepository extends BaseRepository<TechnologyTypes> {
  constructor(
    @InjectRepository(TechnologyTypes)
    readonly repository: Repository<TechnologyTypes>,
  ) {
    super(repository);
  }
}

export default TechnologyTypesRepository;
