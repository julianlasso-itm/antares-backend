import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Levels } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
export class LevelsRepository extends BaseRepository<Levels> {
  constructor(
    @InjectRepository(Levels)
    protected readonly repository: Repository<Levels>,
  ) {
    super(repository);
  }
}
