import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { Levels } from '../../../common/modules/persistence/entities';
import { LevelsRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class LevelsService extends BaseService<Levels, LevelsRepository> {
  constructor(protected readonly repository: LevelsRepository) {
    super(repository);
  }
}
