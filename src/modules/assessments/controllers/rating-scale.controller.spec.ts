import { NewRatingScaleRequestDto } from '@assessments/dto/new-rating-scale-request.dto';
import { UpdateRatingScaleRequestDto } from '@assessments/dto/update-rating-scale-request.dto';
import { RatingScaleService } from '@assessments/services/rating-scale.service';
import Result from '@common/utils/result/result.util';
import { RatingScale } from '@entities/assessments/rating-scale.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { RatingScaleController } from './rating-scale.controller';

describe('RatingScaleController', () => {
  let controller: RatingScaleController;
  let service: jest.Mocked<RatingScaleService>;

  const mockRatingScale: RatingScale = {
    ratingScaleId: 'test-id',
    configurationLevelId: 'config-level-id',
    name: 'Test Scale',
    description: 'Test Description',
    value: 1.0,
    position: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    configurationLevel: {
      configurationLevelId: 'config-level-id',
      name: 'Test Configuration Level',
      status: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      configurationPerLevels: [],
      domainAssessmentScores: [],
      ratingScales: [],
      domainKnowledgeLevels: [],
    },
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingScaleController],
      providers: [
        {
          provide: RatingScaleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RatingScaleController>(RatingScaleController);
    service = module.get(RatingScaleService);
  });

  describe('findAll', () => {
    it('should return paginated rating scales', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockRatingScale], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search');

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        {
          status: 'DESC',
          configurationLevel: {
            name: 'ASC',
          },
          position: 'ASC',
        },
        ['name'],
        'search',
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single rating scale', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockRatingScale));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('ratingScaleId', id);
      expect(result.value).toEqual(mockRatingScale);
    });
  });

  describe('create', () => {
    it('should create a new rating scale', async () => {
      // Arrange
      const dto: NewRatingScaleRequestDto = {
        name: 'New Scale',
        description: 'New Description',
        value: 1.0,
        position: 1,
        configurationLevelId: 'config-level-id',
      };
      service.create.mockResolvedValue(Result.ok(mockRatingScale));

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ratingScaleId: expect.any(String),
          name: dto.name,
          description: dto.description,
          value: dto.value,
          position: dto.position,
          configurationLevelId: dto.configurationLevelId,
        }),
      );
      expect(result.value).toEqual(mockRatingScale);
    });
  });

  describe('update', () => {
    it('should update an existing rating scale', async () => {
      // Arrange
      const dto: UpdateRatingScaleRequestDto = {
        name: 'Updated Scale',
        description: 'Updated Description',
        value: 2.0,
        position: 2,
        configurationLevelId: 'new-config-level-id',
        status: false,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockRatingScale));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'ratingScaleId',
        id,
        expect.objectContaining({
          name: dto.name,
          description: dto.description,
          value: dto.value,
          position: dto.position,
          configurationLevelId: dto.configurationLevelId,
          status: dto.status,
        }),
      );
      expect(result.value).toEqual(mockRatingScale);
    });

    it('should update only provided fields', async () => {
      // Arrange
      const dto: UpdateRatingScaleRequestDto = {
        name: 'Updated Scale',
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockRatingScale));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'ratingScaleId',
        id,
        expect.objectContaining({
          name: dto.name,
        }),
      );
      expect(result.value).toEqual(mockRatingScale);
    });
  });

  describe('delete', () => {
    it('should delete a rating scale', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('ratingScaleId', id);
      expect(result.value).toBeTruthy();
    });
  });
});
