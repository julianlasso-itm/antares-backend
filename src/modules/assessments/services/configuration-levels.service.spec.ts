import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationLevelsService } from './configuration-levels.service';
import ConfigurationLevelsRepository from '@repositories/assessments/configuration-levels.repository';
import { SelectQueryBuilder } from 'typeorm';
import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import Result from '@common/utils/result/result.util';
import AntaresException from '@common/exceptions/antares.exception';

describe('ConfigurationLevelsService', () => {
  let service: ConfigurationLevelsService;
  let repository: ConfigurationLevelsRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<ConfigurationLevels>>;

  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([])
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
        ConfigurationLevelsService,
        {
          provide: ConfigurationLevelsRepository,
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ConfigurationLevelsService>(ConfigurationLevelsService);
    repository = module.get<ConfigurationLevelsRepository>(ConfigurationLevelsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFullConfiguration', () => {
    it('should return first configuration when data exists', async () => {
      // Arrange
      const mockConfiguration = new ConfigurationLevels();
      mockConfiguration.configurationLevelId = '1';
      queryBuilder.getMany.mockResolvedValueOnce([mockConfiguration]);

      // Act
      const result = await service.getFullConfiguration();

      // Assert
      expect(queryBuilder.where).toHaveBeenCalledWith('configurationLevel.deletedAt IS NULL');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('configurationLevel.status = true');
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'configurationLevel.ratingScales',
        'ratingScale'
      );
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('ratingScale.position', 'ASC');
      expect(result).toEqual(Result.ok(mockConfiguration));
    });

    it('should return error when no configuration found', async () => {
      // Arrange
      queryBuilder.getMany.mockResolvedValueOnce([]);

      // Act
      const result = await service.getFullConfiguration();

      // Assert
      expect(result).toEqual(Result.err(new AntaresException('No configuration found')));
    });

    it('should handle database error gracefully', async () => {
      // Arrange
      const dbError = new Error('Database error');
      queryBuilder.getMany.mockRejectedValueOnce(dbError);

      // Act & Assert
      await expect(service.getFullConfiguration()).rejects.toThrow(dbError);
    });

    it('should apply all required filters and joins', async () => {
      // Arrange
      const mockConfiguration = new ConfigurationLevels();
      queryBuilder.getMany.mockResolvedValueOnce([mockConfiguration]);

      // Act
      await service.getFullConfiguration();

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('ratingScale.deletedAt IS NULL');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('ratingScale.status = true');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('configurationPerLevel.deletedAt IS NULL');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('configurationPerLevel.status = true');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('level.deletedAt IS NULL');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith('level.status = true');

      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'configurationLevel.configurationPerLevels',
        'configurationPerLevel'
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'configurationPerLevel.level',
        'level'
      );
    });

    it('should order results correctly', async () => {
      // Arrange
      const mockConfiguration = new ConfigurationLevels();
      queryBuilder.getMany.mockResolvedValueOnce([mockConfiguration]);

      // Act
      await service.getFullConfiguration();

      // Assert
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('ratingScale.position', 'ASC');
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith('configurationPerLevel.position', 'ASC');
    });
  });
});