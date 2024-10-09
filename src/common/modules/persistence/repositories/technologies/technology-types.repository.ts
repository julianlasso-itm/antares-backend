import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyTypes } from '../../entities';
import { BaseRepository } from '../repository.abstract';

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
