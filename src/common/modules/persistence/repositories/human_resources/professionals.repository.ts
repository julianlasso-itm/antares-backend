import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professionals } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class ProfessionalsRepository extends BaseRepository<Professionals> {
  constructor(
    @InjectRepository(Professionals)
    protected readonly repository: Repository<Professionals>,
  ) {
    super(repository);
  }
}

export default ProfessionalsRepository;
