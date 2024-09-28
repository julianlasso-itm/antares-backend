import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationPerLevel } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class ConfigurationPerLevelRepository extends BaseRepository<ConfigurationPerLevel> {
  constructor(
    @InjectRepository(ConfigurationPerLevel)
    protected readonly repository: Repository<ConfigurationPerLevel>,
  ) {
    super(repository);
  }
}

export default ConfigurationPerLevelRepository;
