import { DomainKnowledgeLevels } from '@entities/assessments/domain-knowledge-levels.entity';
import { Test, TestingModule } from '@nestjs/testing';
import DomainKnowledgeLevelsRepository from '@repositories/assessments/domain-knowledge-levels.repository';
import { FindOptionsOrder } from 'typeorm';
import { DomainKnowledgeLevelsService } from './domain-knowledge-levels.service';

describe('DomainKnowledgeLevelsService', () => {
  let service: DomainKnowledgeLevelsService;
  let repository: DomainKnowledgeLevelsRepository;
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
    };

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainKnowledgeLevelsService,
        {
          provide: DomainKnowledgeLevelsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DomainKnowledgeLevelsService>(
      DomainKnowledgeLevelsService,
    );
    repository = module.get<DomainKnowledgeLevelsRepository>(
      DomainKnowledgeLevelsRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
        'domainKnowledgeLevels.deletedAt IS NULL',
      );
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

    it('should apply filter when provided', async () => {
      // Arrange
      const filter = 'testDomainId';

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
        'domainKnowledgeLevels.domainKnowledgeId = :filter',
        { filter },
      );
    });

    it('should apply ordering when provided', async () => {
      // Arrange
      const order: FindOptionsOrder<DomainKnowledgeLevels> = { status: 'DESC' };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'domainKnowledgeLevels.status',
        'DESC',
      );
    });

    it('should return successful result with data', async () => {
      // Arrange
      const mockData = [{ id: 1, name: 'test' }];
      const mockTotal = 1;
      queryBuilder.getManyAndCount.mockResolvedValueOnce([mockData, mockTotal]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual({
        data: mockData,
        total: mockTotal,
      });
    });

    it('should apply all joins and select correct fields', async () => {
      // Arrange & Act
      await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledgeLevels.domainKnowledge',
        'domainKnowledge',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledge.technologyItem',
        'technologyItem',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'technologyItem.technologyType',
        'technologyType',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledgeLevels.level',
        'level',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledgeLevels.configurationLevel',
        'configurationLevel',
      );
      expect(queryBuilder.select).toHaveBeenCalled();
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['domainKnowledgeId'] as Array<
        keyof DomainKnowledgeLevels
      >;
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
  });
});
