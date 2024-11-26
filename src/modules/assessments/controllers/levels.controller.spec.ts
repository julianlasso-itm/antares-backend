import { NewLevelRequestDto } from '@assessments/dto/new-level-request.dto';
import { UpdateLevelRequestDto } from '@assessments/dto/update-level-request.dto';
import { LevelsService } from '@assessments/services/levels.service';
import Result from '@common/utils/result/result.util';
import { Levels } from '@entities/assessments/levels.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { LevelsController } from './levels.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('LevelsController', () => {
  let controller: LevelsController;
  let service: jest.Mocked<LevelsService>;

  const mockLevel = new Levels();
  mockLevel.levelId = 'test-id';
  mockLevel.name = 'Test Level';
  mockLevel.weight = 1.0;
  mockLevel.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelsController],
      providers: [
        {
          provide: LevelsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LevelsController>(LevelsController);
    service = module.get(LevelsService);
  });

  describe('findAll', () => {
    it('should return paginated levels', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockLevel], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search', 'filter');

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        { status: 'DESC', createdAt: 'ASC' },
        ['name'],
        'search',
        'filter',
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single level', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockLevel));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('levelId', id);
      expect(result.value).toEqual(mockLevel);
    });
  });

  describe('create', () => {
    it('should create a new level without filter', async () => {
      // Arrange
      const dto: NewLevelRequestDto = {
        name: 'New Level',
        weight: 1.0,
      };
      service.create.mockResolvedValue(Result.ok(mockLevel));

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          levelId: 'mock-ulid',
          name: dto.name,
          weight: dto.weight,
        }),
      );
      expect(result.value).toEqual(mockLevel);
    });

    it('should create a new level with filter', async () => {
      // Arrange
      const dto: NewLevelRequestDto = {
        name: 'New Level',
        weight: 1.0,
      };
      const filter = 'config-id';
      service.create.mockResolvedValue(Result.ok(mockLevel));

      // Act
      const result = await controller.create(dto, filter);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          levelId: 'mock-ulid',
          name: dto.name,
          weight: dto.weight,
          configurationPerLevels: [
            expect.objectContaining({
              configurationPerLevelId: 'mock-ulid',
              configurationLevelId: filter,
              position: 1,
            }),
          ],
        }),
      );
      expect(result.value).toEqual(mockLevel);
    });
  });

  describe('update', () => {
    it('should update an existing level', async () => {
      // Arrange
      const dto: UpdateLevelRequestDto = {
        name: 'Updated Level',
        status: true,
        weight: 0.5,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockLevel));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'levelId',
        id,
        expect.objectContaining({
          name: dto.name,
          status: dto.status,
          weight: dto.weight,
        }),
      );
      expect(result.value).toEqual(mockLevel);
    });
  });

  describe('delete', () => {
    it('should delete a level', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('levelId', id);
      expect(result.value).toBeTruthy();
    });
  });
});
