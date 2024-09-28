import { Injectable } from '@nestjs/common';
import { Roles } from '../../../common/modules/persistence/entities';
import { RolesRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class RolesService extends BaseService<Roles, RolesRepository> {
  constructor(protected readonly repository: RolesRepository) {
    super(repository);
  }
}
