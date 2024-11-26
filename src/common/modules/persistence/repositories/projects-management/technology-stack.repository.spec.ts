import { TechnologyStack } from '@entities/projects-management/technology-stack.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TechnologyStackRepository from './technology-stack.repository';

describe('TechnologyStackRepository', () => {
  let technologyStackRepository: TechnologyStackRepository;
  let repository: Repository<TechnologyStack>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TechnologyStackRepository,
        {
          provide: getRepositoryToken(TechnologyStack),
          useClass: Repository,
        },
      ],
    }).compile();

    technologyStackRepository = module.get<TechnologyStackRepository>(
      TechnologyStackRepository,
    );
    repository = module.get<Repository<TechnologyStack>>(
      getRepositoryToken(TechnologyStack),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(technologyStackRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = technologyStackRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
