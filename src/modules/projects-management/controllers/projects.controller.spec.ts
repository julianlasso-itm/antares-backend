import Result from '@common/utils/result/result.util';
import { Projects } from '@entities/projects-management/projects.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NewProjectDto } from '@projects-management/dto/new-project.dto';
import { UpdateProjectDto } from '@projects-management/dto/update-project.dto';
import { ProjectsService } from '@projects-management/services/projects.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { ProjectsController } from './projects.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: jest.Mocked<ProjectsService>;

  const mockProject = new Projects();
  mockProject.projectId = 'test-id';
  mockProject.name = 'Test Project';
  mockProject.customerId = 'customer-id';
  mockProject.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get(ProjectsService);
  });

  describe('findAll', () => {
    it('should return paginated projects list', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockProject], 1);
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
    it('should return a single project', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockProject));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('projectId', id);
      expect(result.value).toEqual(mockProject);
    });
  });

  describe('create', () => {
    it('should create a new project', async () => {
      // Arrange
      const dto: NewProjectDto = {
        name: 'New Project',
        customerId: 'customer-id',
      };
      service.create.mockResolvedValue(Result.ok(mockProject));

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          projectId: 'mock-ulid',
          name: dto.name,
          customerId: dto.customerId,
        }),
      );
      expect(result.value).toEqual(mockProject);
    });
  });

  describe('update', () => {
    it('should update existing project', async () => {
      // Arrange
      const dto: UpdateProjectDto = {
        name: 'Updated Project',
        status: false,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockProject));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'projectId',
        id,
        expect.objectContaining({
          name: dto.name,
          status: dto.status,
        }),
      );
      expect(result.value).toEqual(mockProject);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const dto: UpdateProjectDto = {
        name: 'Updated Project',
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockProject));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'projectId',
        id,
        expect.objectContaining({
          name: dto.name,
        }),
      );
      expect(result.value).toEqual(mockProject);
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('projectId', id);
      expect(result.value).toBe(true);
    });
  });
});
