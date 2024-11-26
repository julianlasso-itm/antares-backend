import { NewConfigurationPerLevelRequestDto } from '@assessments/dto/new-configuration-per-level-request.dto';
import { UpdateConfigurationPerLevelRequestDto } from '@assessments/dto/update-configuration-per-level-request.dto';
import { ConfigurationPerLevelService } from '@assessments/services/configuration-per-level.service';
import Result from '@common/utils/result/result.util';
import { ConfigurationPerLevel } from '@entities/assessments/configuration-per-level.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { ConfigurationPerLevelController } from './configuration-per-level.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('ConfigurationPerLevelController', () => {
  let controller: ConfigurationPerLevelController;
  let service: jest.Mocked<ConfigurationPerLevelService>;

  const mockConfigurationPerLevel = new ConfigurationPerLevel();

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationPerLevelController],
      providers: [
        {
          provide: ConfigurationPerLevelService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ConfigurationPerLevelController>(
      ConfigurationPerLevelController,
    );
    service = module.get(ConfigurationPerLevelService);
  });

  describe('findAll', () => {
    it('should return paginated configuration per levels', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockConfigurationPerLevel], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(0, 10, {
        status: 'DESC',
        position: 'ASC',
        configurationLevelId: 'ASC',
      });
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single configuration per level', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockConfigurationPerLevel));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(
        'configurationPerLevelId',
        id,
      );
      expect(result.value).toEqual(mockConfigurationPerLevel);
    });
  });

  describe('create', () => {
    it('should create a new configuration per level', async () => {
      // Arrange
      const dto: NewConfigurationPerLevelRequestDto = {
        configurationLevelId: 'level-id',
        levelId: 'level-1',
        position: 1,
      };
      service.create.mockResolvedValue(Result.ok(mockConfigurationPerLevel));

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          configurationPerLevelId: 'mock-ulid',
          configurationLevelId: dto.configurationLevelId,
          levelId: dto.levelId,
          position: dto.position,
        }),
      );
      expect(result.value).toEqual(mockConfigurationPerLevel);
    });
  });

  describe('update', () => {
    it('should update an existing configuration per level', async () => {
      // Arrange
      const dto: UpdateConfigurationPerLevelRequestDto = {
        configurationLevelId: 'level-id-updated',
        levelId: 'level-2',
        position: 2,
        status: true,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockConfigurationPerLevel));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'configurationPerLevelId',
        id,
        expect.objectContaining({
          configurationLevelId: dto.configurationLevelId,
          levelId: dto.levelId,
          position: dto.position,
          status: dto.status,
        }),
      );
      expect(result.value).toEqual(mockConfigurationPerLevel);
    });

    it('should update only provided fields', async () => {
      // Arrange
      const dto: UpdateConfigurationPerLevelRequestDto = {
        position: 2,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockConfigurationPerLevel));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'configurationPerLevelId',
        id,
        expect.objectContaining({
          position: dto.position,
        }),
      );
      expect(result.value).toEqual(mockConfigurationPerLevel);
    });
  });

  describe('delete', () => {
    it('should delete a configuration per level', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith(
        'configurationPerLevelId',
        id,
      );
      expect(result.value).toBe(true);
    });
  });
});
