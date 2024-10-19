import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class RolesRepository extends BaseRepository<Roles> {
  constructor(
    @InjectRepository(Roles)
    readonly repository: Repository<Roles>,
  ) {
    super(repository);
  }
}

export default RolesRepository;
