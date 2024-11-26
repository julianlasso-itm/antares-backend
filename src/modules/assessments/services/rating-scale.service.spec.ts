import Result from '@common/utils/result/result.util';
import { RatingScale } from '@entities/assessments/rating-scale.entity';
import { Test, TestingModule } from '@nestjs/testing';
import RatingScaleRepository from '@repositories/assessments/rating-scale.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { RatingScaleService } from './rating-scale.service';

describe('RatingScaleService', () => {
  let service: RatingScaleService;
  let repository: RatingScaleRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<RatingScale>>;

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
        RatingScaleService,
        {
          provide: RatingScaleRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RatingScaleService>(RatingScaleService);
    repository = module.get<RatingScaleRepository>(RatingScaleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should apply base filters', async () => {
      // Arrange
      const page = 0;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'ratingScale.deletedAt IS NULL',
      );
    });

    it('should apply search conditions when search parameters are provided', async () => {
      // Arrange
      const searchField: Array<keyof RatingScale> = ['name'];
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

    it('should apply ordering when order parameters are provided', async () => {
      // Arrange
      const order: FindOptionsOrder<RatingScale> = {
        status: 'DESC',
        configurationLevel: {
          name: 'ASC',
        },
      };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'configurationLevel.name',
        'ASC',
      );
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'ratingScale.status',
        'DESC',
      );
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

    it('should return paginated results with total count', async () => {
      // Arrange
      const mockResults: RatingScale[] = [
        {
          ratingScaleId: '1',
          configurationLevelId: '1',
          name: 'Scale 1',
          description: 'Description 1',
          value: 1,
          position: 1,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          configurationLevel: {
            configurationLevelId: '1',
            name: 'Level 1',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            configurationPerLevels: [],
            domainAssessmentScores: [],
            domainKnowledgeLevels: [],
            ratingScales: [],
          },
        },
        {
          ratingScaleId: '2',
          configurationLevelId: '2',
          name: 'Scale 2',
          description: 'Description 2',
          value: 2,
          position: 2,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          configurationLevel: {
            configurationLevelId: '2',
            name: 'Level 2',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            configurationPerLevels: [],
            domainAssessmentScores: [],
            domainKnowledgeLevels: [],
            ratingScales: [],
          },
        },
      ];
      const mockTotal = 2;
      queryBuilder.getManyAndCount.mockResolvedValueOnce([
        mockResults,
        mockTotal,
      ]);

      // Act
      const result = await service.findAll(0, 10);

      // Assert
      expect(result).toEqual(
        Result.ok({
          data: mockResults,
          total: mockTotal,
        }),
      );
    });

    it('should select specific fields in query', async () => {
      // Arrange
      const expectedFields = [
        'ratingScale.ratingScaleId',
        'ratingScale.name',
        'ratingScale.description',
        'ratingScale.value',
        'ratingScale.position',
        'ratingScale.configurationLevelId',
        'ratingScale.status',
        'ratingScale.createdAt',
        'ratingScale.updatedAt',
        'ratingScale.deletedAt',
        'configurationLevel.name',
      ];

      // Act
      await service.findAll();

      // Assert
      expect(queryBuilder.select).toHaveBeenCalledWith(expectedFields);
    });

    it('should include configurationLevel relation', async () => {
      // Arrange & Act
      await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'ratingScale.configurationLevel',
        'configurationLevel',
      );
    });
  });
});
