import { UserPerRole } from '@entities/security/user-per-role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class UserPerRoleRepository extends BaseRepository<UserPerRole> {
  constructor(
    @InjectRepository(UserPerRole)
    readonly repository: Repository<UserPerRole>,
  ) {
    super(repository);
  }
}

export default UserPerRoleRepository;
