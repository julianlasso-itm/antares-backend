import { NewConfigurationLevelRequestDto } from '@assessments/dto/new-configuration-level-request.dto';
import { UpdateConfigurationLevelRequestDto } from '@assessments/dto/update-configuration-level-request.dto';
import { ConfigurationLevelsService } from '@assessments/services/configuration-levels.service';
import Result from '@common/utils/result/result.util';
import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { ConfigurationLevelsController } from './configuration-levels.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('ConfigurationLevelsController', () => {
  let controller: ConfigurationLevelsController;
  let service: jest.Mocked<ConfigurationLevelsService>;

  const mockConfigurationLevel = new ConfigurationLevels();

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getFullConfiguration: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationLevelsController],
      providers: [
        {
          provide: ConfigurationLevelsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ConfigurationLevelsController>(
      ConfigurationLevelsController,
    );
    service = module.get(ConfigurationLevelsService);
  });

  describe('findAll', () => {
    it('should return paginated configuration levels', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockConfigurationLevel], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search');

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        { status: 'DESC', createdAt: 'ASC' },
        ['name'],
        'search',
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('getFullConfiguration', () => {
    it('should return full configuration', async () => {
      // Arrange
      service.getFullConfiguration.mockResolvedValue(
        Result.ok(mockConfigurationLevel),
      );

      // Act
      const result = await controller.getFullConfiguration();

      // Assert
      expect(service.getFullConfiguration).toHaveBeenCalled();
      expect(result.value).toEqual(mockConfigurationLevel);
    });
  });

  describe('findOne', () => {
    it('should return a single configuration level', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockConfigurationLevel));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('configurationLevelId', id);
      expect(result.value).toEqual(mockConfigurationLevel);
    });
  });

  describe('create', () => {
    it('should create a new configuration level', async () => {
      // Arrange
      const dto: NewConfigurationLevelRequestDto = {
        name: 'New Level',
      };
      service.create.mockResolvedValue(Result.ok(mockConfigurationLevel));

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          configurationLevelId: 'mock-ulid',
          name: dto.name,
        }),
      );
      expect(result.value).toEqual(mockConfigurationLevel);
    });
  });

  describe('update', () => {
    it('should update an existing configuration level', async () => {
      // Arrange
      const dto: UpdateConfigurationLevelRequestDto = {
        name: 'Updated Level',
        status: true,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockConfigurationLevel));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'configurationLevelId',
        id,
        expect.objectContaining({
          name: dto.name,
          status: dto.status,
        }),
      );
      expect(result.value).toEqual(mockConfigurationLevel);
    });

    it('should update only provided fields', async () => {
      // Arrange
      const dto: UpdateConfigurationLevelRequestDto = {
        name: 'Updated Level',
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockConfigurationLevel));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'configurationLevelId',
        id,
        expect.objectContaining({
          name: dto.name,
        }),
      );
      expect(result.value).toEqual(mockConfigurationLevel);
    });
  });

  describe('delete', () => {
    it('should delete a configuration level', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('configurationLevelId', id);
      expect(result.value).toBe(true);
    });
  });
});
