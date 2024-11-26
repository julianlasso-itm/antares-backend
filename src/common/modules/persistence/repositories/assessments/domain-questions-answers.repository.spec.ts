import { DomainQuestionsAnswers } from '@entities/assessments/domain-questions-answers.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DomainQuestionsAnswersRepository from './domain-questions-answers.repository';

describe('DomainQuestionsAnswersRepository', () => {
  let domainQuestionsAnswersRepository: DomainQuestionsAnswersRepository;
  let repository: Repository<DomainQuestionsAnswers>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DomainQuestionsAnswersRepository,
        {
          provide: getRepositoryToken(DomainQuestionsAnswers),
          useClass: Repository,
        },
      ],
    }).compile();

    domainQuestionsAnswersRepository =
      module.get<DomainQuestionsAnswersRepository>(
        DomainQuestionsAnswersRepository,
      );
    repository = module.get<Repository<DomainQuestionsAnswers>>(
      getRepositoryToken(DomainQuestionsAnswers),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No action needed for this test

      // Assert
      expect(domainQuestionsAnswersRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = domainQuestionsAnswersRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
