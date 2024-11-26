import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TechnologyItemsRepository from './technology-items.repository';

describe('TechnologyItemsRepository', () => {
  let technologyItemsRepository: TechnologyItemsRepository;
  let repository: Repository<TechnologyItems>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TechnologyItemsRepository,
        {
          provide: getRepositoryToken(TechnologyItems),
          useClass: Repository,
        },
      ],
    }).compile();

    technologyItemsRepository = module.get<TechnologyItemsRepository>(
      TechnologyItemsRepository,
    );
    repository = module.get<Repository<TechnologyItems>>(
      getRepositoryToken(TechnologyItems),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(technologyItemsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = technologyItemsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
