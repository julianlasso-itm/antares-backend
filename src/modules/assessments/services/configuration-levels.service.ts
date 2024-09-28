import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { ConfigurationLevels } from '../../../common/modules/persistence/entities';
import { ConfigurationLevelsRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class ConfigurationLevelsService extends BaseService<
  ConfigurationLevels,
  ConfigurationLevelsRepository
> {
  constructor(protected readonly repository: ConfigurationLevelsRepository) {
    super(repository);
  }
}
