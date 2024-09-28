import { Injectable } from '@nestjs/common';
import { Projects } from '../../../common/modules/persistence/entities';
import { ProjectsRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class ProjectsService extends BaseService<Projects, ProjectsRepository> {
  constructor(protected readonly repository: ProjectsRepository) {
    super(repository);
  }
}
