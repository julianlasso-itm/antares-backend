import { BaseService } from '@common/services/service.abstract';
import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Injectable } from '@nestjs/common';
import TechnologyPerRoleRepository from '@repositories/projects-management/technology-per-role.repository';

@Injectable()
export class TechnologyPerRoleService extends BaseService<
  TechnologyPerRole,
  TechnologyPerRoleRepository
> {
  constructor(protected readonly repository: TechnologyPerRoleRepository) {
    super(repository);
  }
}
