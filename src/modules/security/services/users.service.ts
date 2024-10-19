import { BaseService } from '@common/services/service.abstract';
import { Users } from '@entities/security/users.entity';
import { Injectable } from '@nestjs/common';
import UsersRepository from '@repositories/security/users.repository';

@Injectable()
export class UsersService extends BaseService<Users, UsersRepository> {
  constructor(protected readonly repository: UsersRepository) {
    super(repository);
  }
}
