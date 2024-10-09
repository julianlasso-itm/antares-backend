import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyStack } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class TechnologyStackRepository extends BaseRepository<TechnologyStack> {
  constructor(
    @InjectRepository(TechnologyStack)
    readonly repository: Repository<TechnologyStack>,
  ) {
    super(repository);
  }
}

export default TechnologyStackRepository;
