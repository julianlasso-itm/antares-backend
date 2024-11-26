import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import KnowledgeGapNotesRepository from './knowledge-gap-notes.repository';

describe('KnowledgeGapNotesRepository', () => {
  let knowledgeGapNotesRepository: KnowledgeGapNotesRepository;
  let repository: Repository<KnowledgeGapNotes>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        KnowledgeGapNotesRepository,
        {
          provide: getRepositoryToken(KnowledgeGapNotes),
          useClass: Repository,
        },
      ],
    }).compile();

    knowledgeGapNotesRepository = module.get<KnowledgeGapNotesRepository>(
      KnowledgeGapNotesRepository,
    );
    repository = module.get<Repository<KnowledgeGapNotes>>(
      getRepositoryToken(KnowledgeGapNotes),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(knowledgeGapNotesRepository).toBeDefined();
      expect(repository).toBeDefined();
    });
  });
});