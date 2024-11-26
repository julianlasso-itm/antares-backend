import { Levels } from '@entities/assessments/levels.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { LevelsRepository } from '@repositories/assessments/levels.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { LevelsService } from './levels.service';

describe('LevelsService', () => {
  let service: LevelsService;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<Levels>>;

  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
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
        LevelsService,
        {
          provide: LevelsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LevelsService>(LevelsService);
  });

  it('should be defined', () => {
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
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'level.deletedAt IS NULL',
      );
    });

    it('should apply filter conditions when filter is provided', async () => {
      // Arrange
      const filter = 'testConfigId';

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
      expect(queryBuilder.innerJoin).toHaveBeenCalledWith(
        'level.configurationPerLevels',
        'configPerLevel',
      );
      expect(queryBuilder.innerJoin).toHaveBeenCalledWith(
        'configPerLevel.configurationLevel',
        'configLevel',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'configLevel.configurationLevelId = :filter',
        { filter },
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'configLevel.deletedAt IS NULL',
      );
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['name'] as Array<keyof Levels>;
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
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        '(unaccent(level.name) ILIKE unaccent(:searchTerm) OR word_similarity(level.name, :search) > 0.2)',
        { searchTerm: '%test%', search: 'test' },
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

    it('should apply ordering when order is provided', async () => {
      // Arrange
      const order: FindOptionsOrder<Levels> = { name: 'ASC' };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith('level.name', 'ASC');
    });

    it('should return paginated results successfully', async () => {
      // Arrange
      const mockData = [new Levels()];
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
  });
});
