import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyPerRole } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class TechnologyPerRoleRepository extends BaseRepository<TechnologyPerRole> {
  constructor(
    @InjectRepository(TechnologyPerRole)
    readonly repository: Repository<TechnologyPerRole>,
  ) {
    super(repository);
  }
}

export default TechnologyPerRoleRepository;
