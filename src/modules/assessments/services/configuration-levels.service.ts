import { BaseService } from '@common/services/service.abstract';
import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import { Injectable } from '@nestjs/common';
import ConfigurationLevelsRepository from '@repositories/assessments/configuration-levels.repository';

@Injectable()
export class ConfigurationLevelsService extends BaseService<
  ConfigurationLevels,
  ConfigurationLevelsRepository
> {
  constructor(protected readonly repository: ConfigurationLevelsRepository) {
    super(repository);
  }
}
