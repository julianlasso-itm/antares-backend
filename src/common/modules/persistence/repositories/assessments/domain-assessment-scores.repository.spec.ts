import { DomainAssessmentScores } from '@entities/assessments/domain-assessment-scores.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DomainAssessmentScoresRepository from './domain-assessment-scores.repository';

describe('DomainAssessmentScoresRepository', () => {
  let domainAssessmentScoresRepository: DomainAssessmentScoresRepository;
  let repository: Repository<DomainAssessmentScores>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DomainAssessmentScoresRepository,
        {
          provide: getRepositoryToken(DomainAssessmentScores),
          useClass: Repository,
        },
      ],
    }).compile();

    domainAssessmentScoresRepository = module.get<DomainAssessmentScoresRepository>(
      DomainAssessmentScoresRepository,
    );
    repository = module.get<Repository<DomainAssessmentScores>>(
      getRepositoryToken(DomainAssessmentScores),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No action needed for this test

      // Assert
      expect(domainAssessmentScoresRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = domainAssessmentScoresRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});