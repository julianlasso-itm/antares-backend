import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessments } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class AssessmentsRepository extends BaseRepository<Assessments> {
  constructor(
    @InjectRepository(Assessments)
    readonly repository: Repository<Assessments>,
  ) {
    super(repository);
  }
}

export default AssessmentsRepository;
