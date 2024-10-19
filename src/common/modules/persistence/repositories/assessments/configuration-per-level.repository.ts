import { ConfigurationPerLevel } from '@entities/assessments/configuration-per-level.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class ConfigurationPerLevelRepository extends BaseRepository<ConfigurationPerLevel> {
  constructor(
    @InjectRepository(ConfigurationPerLevel)
    readonly repository: Repository<ConfigurationPerLevel>,
  ) {
    super(repository);
  }
}

export default ConfigurationPerLevelRepository;
