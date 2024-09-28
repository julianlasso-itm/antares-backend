import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class ProjectsRepository extends BaseRepository<Projects> {
  constructor(
    @InjectRepository(Projects)
    protected readonly repository: Repository<Projects>,
  ) {
    super(repository);
  }
}

export default ProjectsRepository;
