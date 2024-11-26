import { Assessments } from '@entities/assessments/assessments.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AssessmentsRepository from './assessments.repository';

describe('AssessmentsRepository', () => {
  let assessmentsRepository: AssessmentsRepository;
  let repository: Repository<Assessments>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AssessmentsRepository,
        {
          provide: getRepositoryToken(Assessments),
          useClass: Repository,
        },
      ],
    }).compile();

    assessmentsRepository = module.get<AssessmentsRepository>(
      AssessmentsRepository,
    );
    repository = module.get<Repository<Assessments>>(
      getRepositoryToken(Assessments),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // ...existing code...

      // Act
      // No action needed for this test

      // Assert
      expect(assessmentsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // ...existing code...

      // Act
      const repoProperty = assessmentsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
