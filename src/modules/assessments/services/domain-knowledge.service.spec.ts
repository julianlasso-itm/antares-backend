import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import { Test, TestingModule } from '@nestjs/testing';
import DomainKnowledgeRepository from '@repositories/assessments/domain-knowledge.repository';
import { FindOptionsOrder } from 'typeorm';
import { DomainKnowledgeService } from './domain-knowledge.service';

describe('DomainKnowledgeService', () => {
  let service: DomainKnowledgeService;
  let repository: DomainKnowledgeRepository;
  let queryBuilder: any;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    getMany: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    queryBuilder = {
      ...mockQueryBuilder,
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      getMany: jest.fn().mockResolvedValue([]),
    };

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainKnowledgeService,
        {
          provide: DomainKnowledgeRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DomainKnowledgeService>(DomainKnowledgeService);
    repository = module.get<DomainKnowledgeRepository>(
      DomainKnowledgeRepository,
    );
  });

  describe('findAll', () => {
    it('should return empty result when no data exists', async () => {
      // Arrange
      queryBuilder.getManyAndCount.mockResolvedValueOnce([[], 0]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual({
        data: [],
        total: 0,
      });
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'domainKnowledge.deletedAt IS NULL',
      );
    });

    it('should apply filter when provided', async () => {
      // Arrange
      const filter = 'testTechnologyItemId';

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        filter,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'domainKnowledge.technologyItemId = :filter',
        { filter },
      );
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['domain'] as Array<keyof DomainKnowledge>;
      const searchTerm = 'test';

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        searchField,
        searchTerm,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should apply pagination when page and size are provided', async () => {
      // Arrange
      const page = 1;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(page * size);
      expect(queryBuilder.take).toHaveBeenCalledWith(size);
    });

    it('should apply ordering when provided', async () => {
      // Arrange
      const order = { status: 'DESC' } as FindOptionsOrder<DomainKnowledge>;

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'domainKnowledge.status',
        'DESC',
      );
    });
  });

  describe('findAllCompletedAssessmentForItemTechnology', () => {
    it('should apply correct relations and conditions', async () => {
      // Arrange
      const assessmentId = 'test-assessment-id';
      const technologyItemId = 'test-technology-id';
      const mockData = [{ id: 1, name: 'test' }];
      queryBuilder.getMany.mockResolvedValueOnce(mockData);

      // Act
      const result = await service.findAllCompletedAssessmentForItemTechnology(
        assessmentId,
        technologyItemId,
      );

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockData);
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledge.domainAssessmentScores',
        'domainAssessmentScores',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'assessment.assessmentId = :assessmentId',
        { assessmentId },
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'technologyItem.technologyItemId = :technologyItemId',
        { technologyItemId },
      );
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'domainKnowledge.weight',
        'DESC',
      );
    });

    it('should return empty array when no data exists', async () => {
      // Arrange
      queryBuilder.getMany.mockResolvedValueOnce([]);

      // Act
      const result = await service.findAllCompletedAssessmentForItemTechnology(
        'test-id',
        'test-id',
      );

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual([]);
    });
  });
});
