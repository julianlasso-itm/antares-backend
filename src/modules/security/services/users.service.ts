import { Injectable } from '@nestjs/common';
import { Users } from '../../../common/modules/persistence/entities/security';
import { UsersRepository } from '../../../common/modules/persistence/repositories/security';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class UsersService extends BaseService<Users, UsersRepository> {
  constructor(protected readonly repository: UsersRepository) {
    super(repository);
  }
}
