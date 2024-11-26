import Result from '@common/utils/result/result.util';
import { TechnologyTypes } from '@entities/technologies/technology-types.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { NewTechnologyTypeDto } from '@technologies/dto/new-technology-type.dto';
import { UpdateTechnologyTypeDto } from '@technologies/dto/update-technology-type.dto';
import { TechnologyTypesService } from '@technologies/services/technology-types.service';
import { TechnologyTypesController } from './technology-types.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('TechnologyTypesController', () => {
  let controller: TechnologyTypesController;
  let service: jest.Mocked<TechnologyTypesService>;

  const mockTechnologyType = new TechnologyTypes();
  mockTechnologyType.technologyTypeId = 'test-id';
  mockTechnologyType.name = 'Test Technology Type';
  mockTechnologyType.description = 'Test Description';
  mockTechnologyType.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologyTypesController],
      providers: [
        {
          provide: TechnologyTypesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TechnologyTypesController>(
      TechnologyTypesController,
    );
    service = module.get(TechnologyTypesService);
  });

  describe('findAll', () => {
    it('should return paginated technology types', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockTechnologyType], 1);
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
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single technology type', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockTechnologyType));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('technologyTypeId', id);
      expect(result.value).toEqual(mockTechnologyType);
    });
  });

  describe('create', () => {
    it('should create a new technology type', async () => {
      // Arrange
      const createDto: NewTechnologyTypeDto = {
        name: 'New Technology Type',
        description: 'New Description',
      };
      service.create.mockResolvedValue(Result.ok(mockTechnologyType));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalled();
      expect(result.value).toEqual(mockTechnologyType);
    });
  });

  describe('update', () => {
    it('should update a technology type', async () => {
      // Arrange
      const updateDto: UpdateTechnologyTypeDto = {
        name: 'Updated Technology Type',
        description: 'Updated Description',
        status: true,
      };
      service.update.mockResolvedValue(Result.ok(mockTechnologyType));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'technologyTypeId',
        id,
        expect.any(TechnologyTypes),
      );
      expect(result.value).toEqual(mockTechnologyType);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const updateDto: UpdateTechnologyTypeDto = {
        name: 'Updated Name',
      };
      service.update.mockResolvedValue(Result.ok(mockTechnologyType));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'technologyTypeId',
        id,
        expect.objectContaining({
          name: 'Updated Name',
        }),
      );
      expect(result.value).toEqual(mockTechnologyType);
    });
  });

  describe('delete', () => {
    it('should delete a technology type', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('technologyTypeId', id);
      expect(result.value).toBe(true);
    });
  });
});
