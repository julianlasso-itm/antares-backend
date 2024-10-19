import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

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
