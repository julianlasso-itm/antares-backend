import { Assessments } from '@entities/assessments/assessments.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

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
