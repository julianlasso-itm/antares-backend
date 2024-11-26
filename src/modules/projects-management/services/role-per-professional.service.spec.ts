import { Test, TestingModule } from '@nestjs/testing';
import RolePerProfessionalRepository from '@repositories/projects-management/role-per-professional.repository';
import { RolePerProfessionalService } from './role-per-professional.service';

describe('RolePerProfessionalService', () => {
  let service: RolePerProfessionalService;
  let repository: RolePerProfessionalRepository;
  let queryBuilder: jest.Mocked<any>;

  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
  });

  beforeEach(async () => {
    queryBuilder = mockQueryBuilder();

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePerProfessionalService,
        {
          provide: RolePerProfessionalRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RolePerProfessionalService>(
      RolePerProfessionalService,
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange - handled by beforeEach

      // Act - constructor called implicitly

      // Assert
      expect(service).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return empty result when no data exists', async () => {
      // Arrange
      queryBuilder.getManyAndCount.mockResolvedValueOnce([[], 0]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual([]);
      expect(result.value.total).toBe(0);
    });

    it('should apply pagination when page and size are provided', async () => {
      // Arrange
      const page = 0;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(page * size);
      expect(queryBuilder.take).toHaveBeenCalledWith(size);
    });

    it('should apply filters when isActiveOnAccount is true', async () => {
      // Arrange
      const isActiveOnAccount = true;

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        isActiveOnAccount,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'rolePerProfessional.endDate IS NULL',
      );
    });
  });

  describe('getAssessmentsByRolePerProfessional', () => {
    it('should return role per professional data when found', async () => {
      // Arrange
      const rolePerProfessionalId = '123';
      const mockData = [{ id: '123', name: 'Test' }];
      queryBuilder.getMany.mockResolvedValueOnce(mockData);

      // Act
      const result = await service.getAssessmentsByRolePerProfessional(
        rolePerProfessionalId,
      );

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockData[0]);
    });

    it('should try getAssessmentsByAssessmentId when no data found', async () => {
      // Arrange
      const rolePerProfessionalId = '123';
      queryBuilder.getMany.mockResolvedValueOnce([]);
      const mockSecondCallData = [{ id: '123', name: 'Test' }];
      queryBuilder.getMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mockSecondCallData);

      // Act
      const result = await service.getAssessmentsByRolePerProfessional(
        rolePerProfessionalId,
      );

      // Assert
      expect(result.isOk).toBe(false);
      expect(result.value).toEqual(null);
    });
  });

  describe('getAssessmentsByAssessmentId', () => {
    it('should return assessment data when found', async () => {
      // Arrange
      const assessmentId = '123';
      const mockData = [{ id: '123', name: 'Test Assessment' }];
      queryBuilder.getMany.mockResolvedValueOnce(mockData);

      // Act
      const result = await service.getAssessmentsByAssessmentId(assessmentId);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockData[0]);
    });

    it('should return error when no configuration found', async () => {
      // Arrange
      const assessmentId = '123';
      queryBuilder.getMany.mockResolvedValueOnce([]);

      // Act
      const result = await service.getAssessmentsByAssessmentId(assessmentId);

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe('No configuration found');
    });

    it('should apply level filters when levelId is provided', async () => {
      // Arrange
      const assessmentId = '123';
      const levelId = '456';

      // Act
      await service.getAssessmentsByAssessmentId(assessmentId, levelId);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'domainKnowledgeLevels.levelId = :levelId',
        { levelId },
      );
    });
  });
});
