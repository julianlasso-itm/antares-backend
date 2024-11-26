import { Projects } from '@entities/projects-management/projects.entity';
import { Test, TestingModule } from '@nestjs/testing';
import ProjectsRepository from '@repositories/projects-management/projects.repository';
import { SelectQueryBuilder } from 'typeorm';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: ProjectsRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<Projects>>;

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
        ProjectsService,
        {
          provide: ProjectsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should apply default deleted records filter', async () => {
      // Arrange
      const page = 0;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'projects.deletedAt IS NULL',
      );
    });

    it('should apply customer filter when provided', async () => {
      // Arrange
      const filter = 'customerId123';

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
        'projects.customerId = :filter',
        { filter },
      );
    });

    it('should apply search conditions when search parameters are provided', async () => {
      // Arrange
      const searchField: Array<keyof Projects> = ['name'];
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
      const page = 2;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(page * size);
      expect(queryBuilder.take).toHaveBeenCalledWith(size);
    });

    it('should apply ordering when order parameters are provided', async () => {
      // Arrange
      const order = { name: 'ASC' as const };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'projects.name',
        'ASC',
      );
    });

    it('should return results wrapped in Result.ok', async () => {
      // Arrange
      const mockProjects = [new Projects()];
      const mockTotal = 1;
      queryBuilder.getManyAndCount.mockResolvedValueOnce([
        mockProjects,
        mockTotal,
      ]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual({
        data: mockProjects,
        total: mockTotal,
      });
    });

    it('should include customer relation and select specific fields', async () => {
      // Arrange & Act
      await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'projects.customer',
        'customer',
      );
      expect(queryBuilder.select).toHaveBeenCalledWith([
        'projects.projectId',
        'projects.customerId',
        'projects.name',
        'projects.status',
        'projects.createdAt',
        'projects.updatedAt',
        'projects.deletedAt',
        'customer.customerId',
        'customer.name',
      ]);
    });
  });
});
