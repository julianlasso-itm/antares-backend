import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Test, TestingModule } from '@nestjs/testing';
import TechnologyPerRoleRepository from '@repositories/projects-management/technology-per-role.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { TechnologyPerRoleService } from './technology-per-role.service';

describe('TechnologyPerRoleService', () => {
  let service: TechnologyPerRoleService;
  let repository: TechnologyPerRoleRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<TechnologyPerRole>>;

  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    getRawMany: jest.fn().mockResolvedValue([]),
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
        TechnologyPerRoleService,
        {
          provide: TechnologyPerRoleRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TechnologyPerRoleService>(TechnologyPerRoleService);
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

    it('should apply filters when filter parameter is provided', async () => {
      // Arrange
      const filter = 'testFilter';

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
      expect(queryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should apply ordering when order parameter is provided', async () => {
      // Arrange
      const order: FindOptionsOrder<TechnologyPerRole> = {
        createdAt: 'DESC',
      };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'technologyPerRole.createdAt',
        'DESC',
      );
    });
  });

  describe('findOnlyRolesByProject', () => {
    it('should return roles for a given project', async () => {
      // Arrange
      const projectId = 'test-project-id';
      const mockRoles = [
        { roleId: '1', name: 'Role 1' },
        { roleId: '2', name: 'Role 2' },
      ];
      queryBuilder.getRawMany.mockResolvedValueOnce(mockRoles);

      // Act
      const result = await service.findOnlyRolesByProject(projectId);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual(mockRoles);
      expect(result.value.total).toBe(mockRoles.length);
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'technologyStack.projectId = :projectId',
        { projectId },
      );
    });

    it('should return empty result when no roles exist for project', async () => {
      // Arrange
      const projectId = 'test-project-id';
      queryBuilder.getRawMany.mockResolvedValueOnce([]);

      // Act
      const result = await service.findOnlyRolesByProject(projectId);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual([]);
      expect(result.value.total).toBe(0);
    });
  });

  it('should apply search conditions when searchField and searchTerm are provided', async () => {
    // Arrange
    const searchField = ['role.name'];
    const searchTerm = 'developer';

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

  it('should exclude disabled records when withDisabled is false', async () => {
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
      'technologyPerRole.status != :withDisabled',
      { withDisabled },
    );
  });
});
