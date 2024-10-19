import { Professionals } from '@entities/human-resources/professionals.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class ProfessionalsRepository extends BaseRepository<Professionals> {
  constructor(
    @InjectRepository(Professionals)
    readonly repository: Repository<Professionals>,
  ) {
    super(repository);
  }
}

export default ProfessionalsRepository;
