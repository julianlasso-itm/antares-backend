import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ConfigurationLevelsRepository from './configuration-levels.repository';

describe('ConfigurationLevelsRepository', () => {
  let configurationLevelsRepository: ConfigurationLevelsRepository;
  let repository: Repository<ConfigurationLevels>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfigurationLevelsRepository,
        {
          provide: getRepositoryToken(ConfigurationLevels),
          useClass: Repository,
        },
      ],
    }).compile();

    configurationLevelsRepository = module.get<ConfigurationLevelsRepository>(
      ConfigurationLevelsRepository,
    );
    repository = module.get<Repository<ConfigurationLevels>>(
      getRepositoryToken(ConfigurationLevels),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed

      // Act
      // No action needed for this test

      // Assert
      expect(configurationLevelsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed

      // Act
      const repoProperty = configurationLevelsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});