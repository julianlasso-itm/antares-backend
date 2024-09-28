import { Injectable } from '@nestjs/common';
import { TechnologyPerRole } from '../../../common/modules/persistence/entities';
import { TechnologyPerRoleRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class TechnologyPerRoleService extends BaseService<
  TechnologyPerRole,
  TechnologyPerRoleRepository
> {
  constructor(protected readonly repository: TechnologyPerRoleRepository) {
    super(repository);
  }
}
