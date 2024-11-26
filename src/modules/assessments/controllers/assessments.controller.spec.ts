import { AssessmentDataDto } from '@assessments/dto/assessment-data.dto';
import Result from '@common/utils/result/result.util';
import { Assessments } from '@entities/assessments/assessments.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsService } from '../services/assessments.service';
import { AssessmentsController } from './assessments.controller';

describe('AssessmentsController', () => {
  let controller: AssessmentsController;
  let service: jest.Mocked<AssessmentsService>;

  const mockAssessmentsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getProfessionalCompletedAssessments: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentsController],
      providers: [
        {
          provide: AssessmentsService,
          useValue: mockAssessmentsService,
        },
      ],
    }).compile();

    controller = module.get<AssessmentsController>(AssessmentsController);
    service = module.get<AssessmentsService>(
      AssessmentsService,
    ) as jest.Mocked<AssessmentsService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated assessments list', async () => {
      // Arrange
      const mockAssessments = [new Assessments()];
      const mockResult = Result.ok({ data: mockAssessments, total: 1 });
      service.findAll.mockResolvedValue(mockResult);

      // Act
      const result = await controller.findAll(0, 10);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        {
          status: 'DESC',
          endDate: 'DESC',
          startDate: 'DESC',
        },
        [],
        undefined,
        undefined,
      );
      expect(result.value.data).toEqual(mockAssessments);
    });
  });

  describe('findOne', () => {
    it('should return a single assessment', async () => {
      // Arrange
      const mockAssessment = new Assessments();
      const mockResult = Result.ok(mockAssessment);
      service.findOne.mockResolvedValue(mockResult);

      // Act
      const result = await controller.findOne('test-id');

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('assessmentId', 'test-id');
      expect(result.value).toEqual(mockAssessment);
    });
  });

  describe('create', () => {
    it('should create a new assessment', async () => {
      // Arrange
      const request: AssessmentDataDto = {
        assessmentId: 'test-id',
        userId: 'user-id',
        rolePerProfessionalId: 'rpp-1',
        configurationLevelId: 'cl-1',
        observations: 'test',
        score: 5,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: true,
        domainKnowledges: [
          {
            domainKnowledgeId: 'dk-1',
            observations: 'test obs',
            score: 4,
            rating: 3,
            domainAssessmentScoreId: null,
          },
        ],
      };

      const mockAssessment = new Assessments();
      const mockResult = Result.ok(mockAssessment);
      service.create.mockResolvedValue(mockResult);

      // Act
      const result = await controller.create(request);

      // Assert
      expect(service.create).toHaveBeenCalled();
      expect(result.value).toEqual(mockAssessment);
    });
  });

  describe('update', () => {
    it('should update an existing assessment', async () => {
      // Arrange
      const request: AssessmentDataDto = {
        assessmentId: 'test-id',
        rolePerProfessionalId: 'rpp-1',
        userId: 'user-id',
        configurationLevelId: 'cl-1',
        observations: 'updated',
        score: 4,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: true,
        domainKnowledges: [],
      };

      const mockAssessment = new Assessments();
      const mockResult = Result.ok(mockAssessment);
      service.update.mockResolvedValue(mockResult);

      // Act
      const result = await controller.update(request, 'test-id');

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'assessmentId',
        'test-id',
        expect.any(Assessments),
      );
      expect(result.value).toEqual(mockAssessment);
    });
  });

  describe('delete', () => {
    it('should delete an assessment', async () => {
      // Arrange
      const mockResult = Result.ok(true);
      service.delete.mockResolvedValue(mockResult);

      // Act
      const result = await controller.delete('test-id');

      // Assert
      expect(service.delete).toHaveBeenCalledWith('assessmentId', 'test-id');
      expect(result.value).toBe(true);
    });
  });

  describe('assessmentPartialSave', () => {
    it('should save partial assessment data', async () => {
      // Arrange
      const request: AssessmentDataDto = {
        assessmentId: 'test-id',
        userId: 'user-id',
        rolePerProfessionalId: 'rpp-1',
        configurationLevelId: 'cl-1',
        observations: 'test',
        score: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: true,
        domainKnowledges: [
          {
            domainKnowledgeId: 'dk-1',
            score: 3,
            observations: 'partial save',
            domainAssessmentScoreId: null,
            rating: 0,
          },
        ],
      };

      const mockAssessment = new Assessments();
      const mockResult = Result.ok(mockAssessment);
      service.create.mockResolvedValue(mockResult);

      // Act
      const result = await controller.assessmentPartialSave(request);

      // Assert
      expect(service.create).toHaveBeenCalled();
      expect(result.value).toEqual(mockAssessment);
    });
  });

  describe('professionalCompletedAssessments', () => {
    it('should return completed assessments for a professional', async () => {
      // Arrange
      const mockAssessments = [new Assessments()];
      const mockResult = Result.ok({ data: mockAssessments, total: 1 });
      service.getProfessionalCompletedAssessments.mockResolvedValue(mockResult);

      // Act
      const result =
        await controller.professionalCompletedAssessments('prof-id');

      // Assert
      expect(service.getProfessionalCompletedAssessments).toHaveBeenCalledWith(
        'prof-id',
      );
      expect(result.value.data).toEqual(mockAssessments);
    });
  });
});
