import Result from '@common/utils/result/result.util';
import { TechnologyStack } from '@entities/projects-management/technology-stack.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NewTechnologyStackDto } from '@projects-management/dto/new-technology-stack.dto';
import { UpdateTechnologyStackDto } from '@projects-management/dto/update-technology-stack.dto';
import { TechnologyStackService } from '@projects-management/services/technology-stack.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { TechnologyStackController } from './technology-stack.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('TechnologyStackController', () => {
  let controller: TechnologyStackController;
  let service: jest.Mocked<TechnologyStackService>;

  const mockTechnologyStack = new TechnologyStack();
  mockTechnologyStack.technologyStackId = 'test-id';
  mockTechnologyStack.projectId = 'project-id';
  mockTechnologyStack.technologyItemId = 'tech-item-id';
  mockTechnologyStack.weight = 1.0;
  mockTechnologyStack.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOneWithFilter: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologyStackController],
      providers: [
        {
          provide: TechnologyStackService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TechnologyStackController>(
      TechnologyStackController,
    );
    service = module.get(TechnologyStackService);
  });

  describe('findAll', () => {
    it('should return paginated technology stacks', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockTechnologyStack], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));
      const page = 0;
      const size = 10;

      // Act
      const result = await controller.findAll(page, size);

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOneWithFilter', () => {
    it('should return filtered technology stack', async () => {
      // Arrange
      service.findOneWithFilter.mockResolvedValue(
        Result.ok(mockTechnologyStack),
      );
      const projectId = 'project-id';
      const technologyItemId = 'tech-item-id';

      // Act
      const result = await controller.findOneWithFilter(
        projectId,
        technologyItemId,
      );

      // Assert
      expect(service.findOneWithFilter).toHaveBeenCalledWith({
        projectId,
        technologyItemId,
      });
      expect(result.value).toEqual(mockTechnologyStack);
    });
  });

  describe('findOne', () => {
    it('should return a single technology stack', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockTechnologyStack));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('technologyStackId', id);
      expect(result.value).toEqual(mockTechnologyStack);
    });
  });

  describe('create', () => {
    it('should create a new technology stack', async () => {
      // Arrange
      const createDto: NewTechnologyStackDto = {
        projectId: 'project-id',
        technologyItemId: 'tech-item-id',
        weight: '1.0',
      };
      service.create.mockResolvedValue(Result.ok(mockTechnologyStack));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalled();
      expect(result.value).toEqual(mockTechnologyStack);
    });
  });

  describe('update', () => {
    it('should update a technology stack', async () => {
      // Arrange
      const updateDto: UpdateTechnologyStackDto = {
        projectId: 'project-id',
        technologyItemId: 'tech-item-id',
        weight: 1.0,
        status: true,
      };
      service.update.mockResolvedValue(Result.ok(mockTechnologyStack));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'technologyStackId',
        id,
        expect.any(TechnologyStack),
      );
      expect(result.value).toEqual(mockTechnologyStack);
    });
  });

  describe('delete', () => {
    it('should delete a technology stack', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('technologyStackId', id);
      expect(result.value).toBe(true);
    });
  });
});
