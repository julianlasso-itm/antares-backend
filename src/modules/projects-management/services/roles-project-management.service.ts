import { BaseService } from '@common/services/service.abstract';
import { RolesSecurity } from '@entities/security/roles-security.entity';
import { Injectable } from '@nestjs/common';
import RolesSecurityRepository from '@repositories/security/roles-security.repository';

@Injectable()
export class RolesProjectManagementService extends BaseService<
  RolesSecurity,
  RolesSecurityRepository
> {
  constructor(protected readonly repository: RolesSecurityRepository) {
    super(repository);
  }
}
