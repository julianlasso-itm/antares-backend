import { TechnologyStack } from '@entities/projects-management/technology-stack.entity';
import { Test, TestingModule } from '@nestjs/testing';
import TechnologyStackRepository from '@repositories/projects-management/technology-stack.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { TechnologyStackService } from './technology-stack.service';

describe('TechnologyStackService', () => {
  let service: TechnologyStackService;
  let repository: TechnologyStackRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<TechnologyStack>>;

  // Mock query builder with common methods
  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
  });

  beforeEach(async () => {
    queryBuilder = mockQueryBuilder() as any;

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologyStackService,
        {
          provide: TechnologyStackRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TechnologyStackService>(TechnologyStackService);
  });

  describe('findAll', () => {
    it('should return empty result when no data exists', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      queryBuilder.getManyAndCount.mockResolvedValueOnce([[], 0]);

      // Act
      const result = await service.findAll(page, size);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual([]);
      expect(result.value.total).toBe(0);
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'technologyStack.deletedAt IS NULL',
      );
    });

    it('should apply pagination when page and size are provided', async () => {
      // Arrange
      const page = 2;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(20);
      expect(queryBuilder.take).toHaveBeenCalledWith(10);
    });

    it('should apply search filters when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['name'];
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

    it('should apply project filter when filter is provided', async () => {
      // Arrange
      const projectId = 'test-project-id';

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        projectId,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'technologyStack.projectId = :filter',
        { filter: projectId },
      );
    });

    it('should apply withDisabled filter when false', async () => {
      // Arrange
      const withDisabled = false;

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        withDisabled,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'technologyStack.status != :withDisabled',
        { withDisabled },
      );
    });

    it('should apply ordering when order parameter is provided', async () => {
      // Arrange
      const order: FindOptionsOrder<TechnologyStack> = { createdAt: 'DESC' };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'technologyStack.createdAt',
        'DESC',
      );
    });

    it('should handle nested ordering for related entities', async () => {
      // Arrange
      const order: FindOptionsOrder<TechnologyStack> = {
        project: { name: 'ASC' },
      };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'project.name',
        'ASC',
      );
    });

    it('should include all required joins and selections', async () => {
      // Arrange
      const mockData = [new TechnologyStack()];
      const mockTotal = 1;
      queryBuilder.getManyAndCount.mockResolvedValueOnce([mockData, mockTotal]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'technologyStack.project',
        'project',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'technologyStack.technologyItem',
        'technologyItem',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'technologyItem.technologyType',
        'technologyType',
      );
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual(mockData);
      expect(result.value.total).toBe(mockTotal);
    });
  });
});
