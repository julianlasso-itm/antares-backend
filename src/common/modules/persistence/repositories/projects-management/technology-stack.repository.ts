import { TechnologyStack } from '@entities/projects-management/technology-stack.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

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
