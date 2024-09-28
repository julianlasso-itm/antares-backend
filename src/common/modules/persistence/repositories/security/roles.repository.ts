import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/security';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class RolesRepository extends BaseRepository<Roles> {
  constructor(
    @InjectRepository(Roles)
    protected readonly repository: Repository<Roles>,
  ) {
    super(repository);
  }
}

export default RolesRepository;
