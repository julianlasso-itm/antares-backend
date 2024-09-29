import { Injectable } from '@nestjs/common';
import { Roles } from '../../../common/modules/persistence/entities/security';
import { RolesRepository } from '../../../common/modules/persistence/repositories/security';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class RolesService extends BaseService<Roles, RolesRepository> {
  constructor(protected readonly repository: RolesRepository) {
    super(repository);
  }
}
