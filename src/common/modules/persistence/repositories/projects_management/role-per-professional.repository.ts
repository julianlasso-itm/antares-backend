import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePerProfessional } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class RolePerProfessionalRepository extends BaseRepository<RolePerProfessional> {
  constructor(
    @InjectRepository(RolePerProfessional)
    protected readonly repository: Repository<RolePerProfessional>,
  ) {
    super(repository);
  }
}

export default RolePerProfessionalRepository;
