import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/security';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class UsersRepository extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    protected readonly repository: Repository<Users>,
  ) {
    super(repository);
  }
}

export default UsersRepository;
