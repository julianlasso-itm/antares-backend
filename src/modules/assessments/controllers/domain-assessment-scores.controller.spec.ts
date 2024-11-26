import { NewDomainAssessmentScoresDto } from '@assessments/dto/new-domain-assessment-scores.dto';
import { UpdateDomainAssessmentScoresDto } from '@assessments/dto/update-domain-assessment-scores.dto';
import { DomainAssessmentScoresService } from '@assessments/services/domain-assessment-scores.service';
import Result from '@common/utils/result/result.util';
import { DomainAssessmentScores } from '@entities/assessments/domain-assessment-scores.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { DomainAssessmentScoresController } from './domain-assessment-scores.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('DomainAssessmentScoresController', () => {
  let controller: DomainAssessmentScoresController;
  let service: jest.Mocked<DomainAssessmentScoresService>;

  const mockDomainAssessmentScore = new DomainAssessmentScores();

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainAssessmentScoresController],
      providers: [
        {
          provide: DomainAssessmentScoresService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DomainAssessmentScoresController>(
      DomainAssessmentScoresController,
    );
    service = module.get(DomainAssessmentScoresService);
  });

  describe('findAll', () => {
    it('should return paginated domain assessment scores', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockDomainAssessmentScore], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(0, 10, {
        status: 'DESC',
        createdAt: 'ASC',
      });
      expect(result.value.data).toEqual([mockDomainAssessmentScore]);
      expect(result.value.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single domain assessment score', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockDomainAssessmentScore));

      // Act
      const result = await controller.findOne('test-id');

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(
        'domainAssessmentScoreId',
        'test-id',
      );
      expect(result.value).toEqual(mockDomainAssessmentScore);
    });
  });

  describe('create', () => {
    it('should create a new domain assessment score', async () => {
      // Arrange
      const createDto: NewDomainAssessmentScoresDto = {
        assessmentId: 'test-assessment',
        domainKnowledgeId: 'test-domain',
        configurationLevelId: 'test-config',
        score: 4.5,
        observations: 'Test observation',
      };
      service.create.mockResolvedValue(Result.ok(mockDomainAssessmentScore));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          domainAssessmentScoreId: 'mock-ulid',
          ...createDto,
        }),
      );
      expect(result.value).toEqual(mockDomainAssessmentScore);
    });
  });

  describe('update', () => {
    it('should update an existing domain assessment score', async () => {
      // Arrange
      const updateDto: UpdateDomainAssessmentScoresDto = {
        observations: 'Updated observation',
        score: 5.0,
        status: true,
      };
      service.update.mockResolvedValue(Result.ok(mockDomainAssessmentScore));

      // Act
      const result = await controller.update(updateDto, 'test-id');

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'domainAssessmentScoreId',
        'test-id',
        expect.objectContaining({
          observations: 'Updated observation',
          score: 5.0,
          status: true,
        }),
      );
      expect(result.value).toEqual(mockDomainAssessmentScore);
    });

    it('should update only provided fields', async () => {
      // Arrange
      const updateDto: UpdateDomainAssessmentScoresDto = {
        observations: 'Updated observation',
      };
      service.update.mockResolvedValue(Result.ok(mockDomainAssessmentScore));

      // Act
      await controller.update(updateDto, 'test-id');

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'domainAssessmentScoreId',
        'test-id',
        expect.objectContaining({
          observations: 'Updated observation',
        }),
      );
    });
  });

  describe('delete', () => {
    it('should delete a domain assessment score', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete('test-id');

      // Assert
      expect(service.delete).toHaveBeenCalledWith(
        'domainAssessmentScoreId',
        'test-id',
      );
      expect(result.value).toBe(true);
    });
  });
});
