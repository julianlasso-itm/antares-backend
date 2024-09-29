import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { UserPerRole } from '../../../common/modules/persistence/entities/security';
import { UserPerRoleRepository } from '../../../common/modules/persistence/repositories/security';

@Injectable()
export class UserPerRoleService extends BaseService<
  UserPerRole,
  UserPerRoleRepository
> {
  constructor(protected readonly repository: UserPerRoleRepository) {
    super(repository);
  }
}
