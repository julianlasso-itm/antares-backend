import { TechnologyTypes } from '@entities/technologies/technology-types.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TechnologyTypesRepository from './technology-types.repository';

describe('TechnologyTypesRepository', () => {
  let technologyTypesRepository: TechnologyTypesRepository;
  let repository: Repository<TechnologyTypes>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TechnologyTypesRepository,
        {
          provide: getRepositoryToken(TechnologyTypes),
          useClass: Repository,
        },
      ],
    }).compile();

    technologyTypesRepository = module.get<TechnologyTypesRepository>(
      TechnologyTypesRepository,
    );
    repository = module.get<Repository<TechnologyTypes>>(
      getRepositoryToken(TechnologyTypes),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(technologyTypesRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = technologyTypesRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});