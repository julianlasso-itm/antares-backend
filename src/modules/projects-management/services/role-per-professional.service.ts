import { Injectable } from '@nestjs/common';
import { RolePerProfessional } from '../../../common/modules/persistence/entities';
import { RolePerProfessionalRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class RolePerProfessionalService extends BaseService<
  RolePerProfessional,
  RolePerProfessionalRepository
> {
  constructor(protected readonly repository: RolePerProfessionalRepository) {
    super(repository);
  }
}
