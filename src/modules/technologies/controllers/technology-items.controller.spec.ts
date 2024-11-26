import Result from '@common/utils/result/result.util';
import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { NewTechnologyItemDto } from '@technologies/dto/new-technology-item.dto';
import { UpdateTechnologyItemDto } from '@technologies/dto/update-technology-item.dto';
import { TechnologyItemsService } from '@technologies/services/technology-items.service';
import { TechnologyItemsController } from './technology-items.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('TechnologyItemsController', () => {
  let controller: TechnologyItemsController;
  let service: jest.Mocked<TechnologyItemsService>;

  const mockTechnologyItem = new TechnologyItems();
  mockTechnologyItem.technologyItemId = 'test-id';
  mockTechnologyItem.name = 'Test Technology';
  mockTechnologyItem.technologyTypeId = 'type-id';
  mockTechnologyItem.description = 'Test Description';
  mockTechnologyItem.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findAllCompletedAssessment: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologyItemsController],
      providers: [
        {
          provide: TechnologyItemsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TechnologyItemsController>(
      TechnologyItemsController,
    );
    service = module.get(TechnologyItemsService);
  });

  describe('findAll', () => {
    it('should return paginated technology items', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockTechnologyItem], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));
      const page = 0;
      const size = 10;

      // Act
      const result = await controller.findAll(page, size);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        { status: 'DESC', createdAt: 'ASC' },
        ['name', 'description'],
        undefined,
        undefined,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single technology item', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockTechnologyItem));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('technologyItemId', id);
      expect(result.value).toEqual(mockTechnologyItem);
    });
  });

  describe('findAllCompletedAssessment', () => {
    it('should return all completed assessment technology items', async () => {
      // Arrange
      service.findAllCompletedAssessment.mockResolvedValue(
        Result.ok([mockTechnologyItem]),
      );
      const assessmentId = 'assessment-id';

      // Act
      const result = await controller.findAllCompletedAssessment(assessmentId);

      // Assert
      expect(service.findAllCompletedAssessment).toHaveBeenCalledWith(
        assessmentId,
      );
      expect(result.value).toEqual([mockTechnologyItem]);
    });
  });

  describe('create', () => {
    it('should create a new technology item', async () => {
      // Arrange
      const createDto: NewTechnologyItemDto = {
        technologyTypeId: 'type-id',
        name: 'New Technology',
        description: 'New Description',
        icon: 'icon-url',
      };
      service.create.mockResolvedValue(Result.ok(mockTechnologyItem));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalled();
      expect(result.value).toEqual(mockTechnologyItem);
    });
  });

  describe('update', () => {
    it('should update a technology item', async () => {
      // Arrange
      const updateDto: UpdateTechnologyItemDto = {
        technologyTypeId: 'type-id',
        name: 'Updated Technology',
        description: 'Updated Description',
        status: true,
      };
      service.update.mockResolvedValue(Result.ok(mockTechnologyItem));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'technologyItemId',
        id,
        expect.any(TechnologyItems),
      );
      expect(result.value).toEqual(mockTechnologyItem);
    });
  });

  describe('delete', () => {
    it('should delete a technology item', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('technologyItemId', id);
      expect(result.value).toBe(true);
    });
  });
});
