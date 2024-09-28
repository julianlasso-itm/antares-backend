import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common';
import { ConfigurationPerLevel } from '../../../common/modules/persistence/entities';
import { ConfigurationPerLevelRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class ConfigurationPerLevelService extends BaseService<
  ConfigurationPerLevel,
  ConfigurationPerLevelRepository
> {
  constructor(protected readonly repository: ConfigurationPerLevelRepository) {
    super(repository);
  }
}
