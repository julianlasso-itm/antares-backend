import { RolesProjectManagement } from '@entities/projects-management/roles-projects-management.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class RolesProjectManagementRepository extends BaseRepository<RolesProjectManagement> {
  constructor(
    @InjectRepository(RolesProjectManagement)
    readonly repository: Repository<RolesProjectManagement>,
  ) {
    super(repository);
  }
}

export default RolesProjectManagementRepository;
