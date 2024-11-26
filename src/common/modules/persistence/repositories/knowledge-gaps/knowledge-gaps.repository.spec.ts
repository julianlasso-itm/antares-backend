import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import KnowledgeGapsRepository from './knowledge-gaps.repository';

describe('KnowledgeGapsRepository', () => {
  let knowledgeGapsRepository: KnowledgeGapsRepository;
  let repository: Repository<KnowledgeGaps>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        KnowledgeGapsRepository,
        {
          provide: getRepositoryToken(KnowledgeGaps),
          useClass: Repository,
        },
      ],
    }).compile();

    knowledgeGapsRepository = module.get<KnowledgeGapsRepository>(
      KnowledgeGapsRepository,
    );
    repository = module.get<Repository<KnowledgeGaps>>(
      getRepositoryToken(KnowledgeGaps),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(knowledgeGapsRepository).toBeDefined();
      expect(repository).toBeDefined();
    });
  });
});