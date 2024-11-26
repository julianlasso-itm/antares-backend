import Result from '@common/utils/result/result.util';
import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NewTechnologyPerRoleDto } from '@projects-management/dto/new-technology-per-role.dto';
import { UpdateTechnologyPerRoleDto } from '@projects-management/dto/update-technology-per-role.dto';
import { TechnologyPerRoleService } from '@projects-management/services/technology-per-role.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { TechnologyPerRoleController } from './technology-per-role.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('TechnologyPerRoleController', () => {
  let controller: TechnologyPerRoleController;
  let service: jest.Mocked<TechnologyPerRoleService>;

  const mockTechnologyPerRole = new TechnologyPerRole();
  mockTechnologyPerRole.technologyPerRoleId = 'test-id';
  mockTechnologyPerRole.roleId = 'role-id';
  mockTechnologyPerRole.technologyStackId = 'tech-stack-id';
  mockTechnologyPerRole.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOnlyRolesByProject: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologyPerRoleController],
      providers: [
        {
          provide: TechnologyPerRoleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TechnologyPerRoleController>(
      TechnologyPerRoleController,
    );
    service = module.get(TechnologyPerRoleService);
  });

  describe('findAll', () => {
    it('should return paginated technology per roles', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockTechnologyPerRole], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search', 'filter', true);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        {
          status: 'DESC',
          customer: { name: 'ASC' },
          project: { name: 'ASC' },
          role: { name: 'ASC' },
          technologyItem: { name: 'ASC' },
        },
        ['role.name', 'project.name', 'technologyItem.name', 'customer.name'],
        'search',
        'filter',
        true,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOnlyRolesByProject', () => {
    it('should return roles by project', async () => {
      // Arrange
      const mockRoles = [{ roleId: 'role-1', name: 'Role 1' }];
      const mockResponse = new FindAllResponse(mockRoles, 1);
      service.findOnlyRolesByProject.mockResolvedValue(Result.ok(mockResponse));
      const projectId = 'project-id';

      // Act
      const result = await controller.findOnlyRolesByProject(projectId);

      // Assert
      expect(service.findOnlyRolesByProject).toHaveBeenCalledWith(projectId);
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single technology per role', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockTechnologyPerRole));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('technologyPerRoleId', id);
      expect(result.value).toEqual(mockTechnologyPerRole);
    });
  });

  describe('create', () => {
    it('should create a new technology per role', async () => {
      // Arrange
      const createDto: NewTechnologyPerRoleDto = {
        roleId: 'role-id',
        technologyStackId: 'tech-stack-id',
      };
      service.create.mockResolvedValue(Result.ok(mockTechnologyPerRole));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          technologyPerRoleId: 'mock-ulid',
          roleId: createDto.roleId,
          technologyStackId: createDto.technologyStackId,
        }),
      );
      expect(result.value).toEqual(mockTechnologyPerRole);
    });
  });

  describe('update', () => {
    it('should update an existing technology per role', async () => {
      // Arrange
      const updateDto: UpdateTechnologyPerRoleDto = {
        roleId: 'new-role-id',
        technologyStackId: 'new-tech-stack-id',
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockTechnologyPerRole));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'technologyPerRoleId',
        id,
        expect.objectContaining({
          roleId: updateDto.roleId,
          technologyStackId: updateDto.technologyStackId,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockTechnologyPerRole);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const updateDto: UpdateTechnologyPerRoleDto = {
        roleId: 'new-role-id',
      };
      service.update.mockResolvedValue(Result.ok(mockTechnologyPerRole));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'technologyPerRoleId',
        id,
        expect.objectContaining({
          roleId: updateDto.roleId,
        }),
      );
      expect(result.value).toEqual(mockTechnologyPerRole);
    });
  });

  describe('delete', () => {
    it('should delete a technology per role', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('technologyPerRoleId', id);
      expect(result.value).toBe(true);
    });
  });
});
