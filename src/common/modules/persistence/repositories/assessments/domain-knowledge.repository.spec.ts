import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DomainKnowledgeRepository from './domain-knowledge.repository';

describe('DomainKnowledgeRepository', () => {
  let domainKnowledgeRepository: DomainKnowledgeRepository;
  let repository: Repository<DomainKnowledge>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DomainKnowledgeRepository,
        {
          provide: getRepositoryToken(DomainKnowledge),
          useClass: Repository,
        },
      ],
    }).compile();

    domainKnowledgeRepository = module.get<DomainKnowledgeRepository>(
      DomainKnowledgeRepository,
    );
    repository = module.get<Repository<DomainKnowledge>>(
      getRepositoryToken(DomainKnowledge),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No action needed for this test

      // Assert
      expect(domainKnowledgeRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = domainKnowledgeRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
