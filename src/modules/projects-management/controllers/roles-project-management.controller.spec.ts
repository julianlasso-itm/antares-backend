import Result from '@common/utils/result/result.util';
import { RolesProjectManagement } from '@entities/projects-management/roles-projects-management.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesProjectManagementService } from '@projects-management/services/roles-project-management.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { NewRoleSecurityDto } from '@security/dto/new-role-security.dto';
import { UpdateRoleSecurityDto } from '@security/dto/update-role-security.dto';
import { RolesProjectManagementController } from './roles-project-management.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('RolesProjectManagementController', () => {
  let controller: RolesProjectManagementController;
  let service: jest.Mocked<RolesProjectManagementService>;

  const mockRole = new RolesProjectManagement();
  mockRole.roleId = 'test-id';
  mockRole.name = 'Test Role';
  mockRole.description = 'Test Description';
  mockRole.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesProjectManagementController],
      providers: [
        {
          provide: RolesProjectManagementService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RolesProjectManagementController>(
      RolesProjectManagementController,
    );
    service = module.get(RolesProjectManagementService);
  });

  describe('findAll', () => {
    it('should return paginated roles list', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockRole], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search', 'filter', true);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        { status: 'DESC', createdAt: 'ASC' },
        ['name', 'description'],
        'search',
        'filter',
        true,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single role', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockRole));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('roleId', id);
      expect(result.value).toEqual(mockRole);
    });
  });

  describe('create', () => {
    it('should create a new role', async () => {
      // Arrange
      const createDto: NewRoleSecurityDto = {
        name: 'New Role',
        description: 'New Description',
      };
      service.create.mockResolvedValue(Result.ok(mockRole));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          roleId: 'mock-ulid',
          name: createDto.name,
          description: createDto.description,
        }),
      );
      expect(result.value).toEqual(mockRole);
    });
  });

  describe('update', () => {
    it('should update existing role', async () => {
      // Arrange
      const updateDto: UpdateRoleSecurityDto = {
        name: 'Updated Role',
        description: 'Updated Description',
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockRole));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'roleId',
        id,
        expect.objectContaining({
          name: updateDto.name,
          description: updateDto.description,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockRole);
    });

    it('should update only provided fields', async () => {
      // Arrange
      const updateDto: UpdateRoleSecurityDto = {
        name: 'Updated Role',
      };
      service.update.mockResolvedValue(Result.ok(mockRole));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'roleId',
        id,
        expect.objectContaining({
          name: updateDto.name,
        }),
      );
      expect(result.value).toEqual(mockRole);
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('roleId', id);
      expect(result.value).toBe(true);
    });
  });
});
