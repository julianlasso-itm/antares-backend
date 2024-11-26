import { Test, TestingModule } from '@nestjs/testing';
import DomainAssessmentScoresRepository from '@repositories/assessments/domain-assessment-scores.repository';
import { DomainAssessmentScoresService } from './domain-assessment-scores.service';

describe('DomainAssessmentScoresService', () => {
  let service: DomainAssessmentScoresService;
  let repository: DomainAssessmentScoresRepository;

  beforeEach(async () => {
    // Arrange
    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainAssessmentScoresService,
        {
          provide: DomainAssessmentScoresRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DomainAssessmentScoresService>(
      DomainAssessmentScoresService,
    );
    repository = module.get<DomainAssessmentScoresRepository>(
      DomainAssessmentScoresRepository,
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act - service is instantiated in beforeEach

      // Assert
      expect(service).toBeDefined();
    });

    it('should have repository injected', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act - service is instantiated in beforeEach

      // Assert
      expect(service['repository']).toBeDefined();
      expect(service['repository']).toBe(repository);
    });
  });
});
