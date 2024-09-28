import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationLevels } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class ConfigurationLevelsRepository extends BaseRepository<ConfigurationLevels> {
  constructor(
    @InjectRepository(ConfigurationLevels)
    protected readonly repository: Repository<ConfigurationLevels>,
  ) {
    super(repository);
  }
}

export default ConfigurationLevelsRepository;
