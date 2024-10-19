import { Projects } from '@entities/projects-management/projects.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class ProjectsRepository extends BaseRepository<Projects> {
  constructor(
    @InjectRepository(Projects)
    readonly repository: Repository<Projects>,
  ) {
    super(repository);
  }
}

export default ProjectsRepository;
