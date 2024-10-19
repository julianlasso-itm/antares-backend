import { BaseService } from '@common/services/service.abstract';
import { UserPerRole } from '@entities/security/user-per-role.entity';
import { Injectable } from '@nestjs/common';
import UserPerRoleRepository from '@repositories/security/user-per-role.repository';

@Injectable()
export class UserPerRoleService extends BaseService<
  UserPerRole,
  UserPerRoleRepository
> {
  constructor(protected readonly repository: UserPerRoleRepository) {
    super(repository);
  }
}
