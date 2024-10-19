import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class RolePerProfessionalRepository extends BaseRepository<RolePerProfessional> {
  constructor(
    @InjectRepository(RolePerProfessional)
    readonly repository: Repository<RolePerProfessional>,
  ) {
    super(repository);
  }
}

export default RolePerProfessionalRepository;
