import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class ConfigurationLevelsRepository extends BaseRepository<ConfigurationLevels> {
  constructor(
    @InjectRepository(ConfigurationLevels)
    readonly repository: Repository<ConfigurationLevels>,
  ) {
    super(repository);
  }
}

export default ConfigurationLevelsRepository;
