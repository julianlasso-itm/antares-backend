import { BaseService } from '@common/services/service.abstract';
import { RolesProjectManagement } from '@entities/projects-management/roles-projects-management.entity';
import { Injectable } from '@nestjs/common';
import RolesProjectManagementRepository from '@repositories/projects-management/roles-project-management.repository';

@Injectable()
export class RolesProjectManagementService extends BaseService<
  RolesProjectManagement,
  RolesProjectManagementRepository
> {
  constructor(protected readonly repository: RolesProjectManagementRepository) {
    super(repository);
  }
}
