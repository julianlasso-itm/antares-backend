import { Users } from '@entities/security/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class UsersRepository extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    readonly repository: Repository<Users>,
  ) {
    super(repository);
  }
}

export default UsersRepository;
