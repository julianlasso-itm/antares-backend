import { RolesSecurity } from '@entities/security/roles-security.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class RolesSecurityRepository extends BaseRepository<RolesSecurity> {
  constructor(
    @InjectRepository(RolesSecurity)
    readonly repository: Repository<RolesSecurity>,
  ) {
    super(repository);
  }
}

export default RolesSecurityRepository;
