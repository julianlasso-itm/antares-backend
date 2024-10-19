import { Levels } from '@entities/assessments/levels.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
export class LevelsRepository extends BaseRepository<Levels> {
  constructor(
    @InjectRepository(Levels)
    readonly repository: Repository<Levels>,
  ) {
    super(repository);
  }
}
