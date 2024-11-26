import { ConfigurationPerLevel } from '@entities/assessments/configuration-per-level.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ConfigurationPerLevelRepository from './configuration-per-level.repository';

describe('ConfigurationPerLevelRepository', () => {
  let configurationPerLevelRepository: ConfigurationPerLevelRepository;
  let repository: Repository<ConfigurationPerLevel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfigurationPerLevelRepository,
        {
          provide: getRepositoryToken(ConfigurationPerLevel),
          useClass: Repository,
        },
      ],
    }).compile();

    configurationPerLevelRepository =
      module.get<ConfigurationPerLevelRepository>(
        ConfigurationPerLevelRepository,
      );
    repository = module.get<Repository<ConfigurationPerLevel>>(
      getRepositoryToken(ConfigurationPerLevel),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(configurationPerLevelRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = configurationPerLevelRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
