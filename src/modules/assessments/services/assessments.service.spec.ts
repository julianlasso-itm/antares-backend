import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsService } from './assessments.service';
import AssessmentsRepository from '@repositories/assessments/assessments.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import Result from '@common/utils/result/result.util';
import { Assessments } from '@entities/assessments/assessments.entity';
import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { Users } from '@entities/security/users.entity';

describe('AssessmentsService', () => {
  let service: AssessmentsService;
  let repository: AssessmentsRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<Assessments>>;

  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[],0])
  });

  beforeEach(async () => {
    queryBuilder = mockQueryBuilder() as any;

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder)
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentsService,
        {
          provide: AssessmentsRepository,
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<AssessmentsService>(AssessmentsService);
    repository = module.get<AssessmentsRepository>(AssessmentsRepository);
  });

  it('should be defined', () => {
    // Assert
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should apply default filters', async () => {
      // Arrange
      const page = 0;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.where).toHaveBeenCalledWith('assessment.deletedAt IS NULL');
    });

    it('should apply pagination when page and size are provided', async () => {
      // Arrange
      const page = 0;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(0);
      expect(queryBuilder.take).toHaveBeenCalledWith(10);
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField: Array<keyof Assessments> = ['observations'];
      const searchTerm = 'test';

      // Act
      await service.findAll(undefined, undefined, undefined, searchField, searchTerm);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalled();
    });
  });

  describe('getProfessionalCompletedAssessments', () => {
    it('should apply professional filters and return results', async () => {
      // Arrange
      const professionalId = '123';
      const mockAssessments: Assessments[] = [{
        assessmentId: '1',
        rolePerProfessionalId: 'rpp1',
        userId: 'user1',
        observations: null,
        score: 0,
        startDate: new Date(),
        endDate: new Date(),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        rolePerProfessional: new RolePerProfessional(),
        user: new Users(),
        domainAssessmentScores: [],
        knowledgeGaps: []
      }];
      queryBuilder.getManyAndCount.mockResolvedValueOnce([mockAssessments, 1]);

      // Act
      const result = await service.getProfessionalCompletedAssessments(professionalId);

      // Assert
      expect(result).toBeInstanceOf(Result);
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'rolePerProfessional.professionalId = :professionalId',
        { professionalId }
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('assessment.endDate IS NOT NULL');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('assessment.status = true');
    });
  });

  describe('applyOrdering', () => {
    it('should apply simple ordering', async () => {
      // Arrange
      const order: FindOptionsOrder<Assessments> = { createdAt: 'DESC' };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'assessment.createdAt',
        'DESC'
      );
    });

    it('should apply complex ordering with nested fields', async () => {
      // Arrange
      const order: FindOptionsOrder<Assessments> = { rolePerProfessional: { status: 'ASC' } };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'rolePerProfessional.status',
        'ASC'
      );
    });
  });

  describe('applyRelations', () => {
    it('should apply all required relations', async () => {
      // Act
      await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'assessment.rolePerProfessional',
        'rolePerProfessional'
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'rolePerProfessional.professional',
        'professional'
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'rolePerProfessional.role',
        'role'
      );
    });
  });

  describe('applyFilter', () => {
    it('should apply filter conditions when filter is provided', async () => {
      // Arrange
      const filter = '123';

      // Act
      await service.findAll(undefined, undefined, undefined, undefined, undefined, filter);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'assessment.rolePerProfessionalId = :filter',
        { filter }
      );
      expect(queryBuilder.orWhere).toHaveBeenCalledWith(
        'assessment.userId = :filter',
        { filter }
      );
    });

    it('should not apply filter conditions when filter is not provided', async () => {
      // Act
      await service.findAll();

      // Assert
      expect(queryBuilder.andWhere).not.toHaveBeenCalledWith(
        'assessment.rolePerProfessionalId = :filter',
        expect.any(Object)
      );
      expect(queryBuilder.orWhere).not.toHaveBeenCalledWith(
        'assessment.userId = :filter',
        expect.any(Object)
      );
    });
  });
});