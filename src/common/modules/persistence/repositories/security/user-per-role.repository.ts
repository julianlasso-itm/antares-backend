import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPerRole } from '../../entities/security';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class UserPerRoleRepository extends BaseRepository<UserPerRole> {
  constructor(
    @InjectRepository(UserPerRole)
    protected readonly repository: Repository<UserPerRole>,
  ) {
    super(repository);
  }
}

export default UserPerRoleRepository;
