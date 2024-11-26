import { DomainKnowledgeLevels } from '@entities/assessments/domain-knowledge-levels.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DomainKnowledgeLevelsRepository from './domain-knowledge-levels.repository';

describe('DomainKnowledgeLevelsRepository', () => {
  let domainKnowledgeLevelsRepository: DomainKnowledgeLevelsRepository;
  let repository: Repository<DomainKnowledgeLevels>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DomainKnowledgeLevelsRepository,
        {
          provide: getRepositoryToken(DomainKnowledgeLevels),
          useClass: Repository,
        },
      ],
    }).compile();

    domainKnowledgeLevelsRepository =
      module.get<DomainKnowledgeLevelsRepository>(
        DomainKnowledgeLevelsRepository,
      );
    repository = module.get<Repository<DomainKnowledgeLevels>>(
      getRepositoryToken(DomainKnowledgeLevels),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No action needed for this test

      // Assert
      expect(domainKnowledgeLevelsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = domainKnowledgeLevelsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
