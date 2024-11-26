import { Levels } from '@entities/assessments/levels.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelsRepository } from './levels.repository';

describe('LevelsRepository', () => {
  let levelsRepository: LevelsRepository;
  let repository: Repository<Levels>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LevelsRepository,
        {
          provide: getRepositoryToken(Levels),
          useClass: Repository,
        },
      ],
    }).compile();

    levelsRepository = module.get<LevelsRepository>(LevelsRepository);
    repository = module.get<Repository<Levels>>(getRepositoryToken(Levels));
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(levelsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = levelsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});