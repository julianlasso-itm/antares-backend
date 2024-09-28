import { Injectable } from '@nestjs/common';
import { ConfigurationLevels } from '../../../common/modules/persistence/entities';
import { ConfigurationLevelsRepository } from '../../../common/modules/persistence/repositories/assessments';
import { BaseService } from './service.abstract';

@Injectable()
export class ConfigurationLevelsService extends BaseService<
  ConfigurationLevels,
  ConfigurationLevelsRepository
> {
  constructor(protected readonly repository: ConfigurationLevelsRepository) {
    super(repository);
  }
}
