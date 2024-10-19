import { BaseService } from '@common/services/service.abstract';
import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { Injectable } from '@nestjs/common';
import RolePerProfessionalRepository from '@repositories/projects-management/role-per-professional.repository';

@Injectable()
export class RolePerProfessionalService extends BaseService<
  RolePerProfessional,
  RolePerProfessionalRepository
> {
  constructor(protected readonly repository: RolePerProfessionalRepository) {
    super(repository);
  }
}
