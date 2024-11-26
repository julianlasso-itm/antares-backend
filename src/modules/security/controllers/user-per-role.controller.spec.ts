import Result from '@common/utils/result/result.util';
import { UserPerRole } from '@entities/security/user-per-role.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { NewUserPerRoleDto } from '@security/dto/new-user-per-role.dto';
import { UpdateUserPerRoleDto } from '@security/dto/update-user-per-role.dto';
import { UserPerRoleService } from '@security/services/user-per-role.service';
import { UserPerRoleController } from './user-per-role.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('UserPerRoleController', () => {
  let controller: UserPerRoleController;
  let service: jest.Mocked<UserPerRoleService>;

  const mockUserPerRole = new UserPerRole();
  mockUserPerRole.userPerRoleId = 'test-id';
  mockUserPerRole.userId = 'user-id';
  mockUserPerRole.roleId = 'role-id';
  mockUserPerRole.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPerRoleController],
      providers: [
        {
          provide: UserPerRoleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserPerRoleController>(UserPerRoleController);
    service = module.get(UserPerRoleService);
  });

  describe('findAll', () => {
    it('should return paginated user per roles', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockUserPerRole], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(0, 10, {
        status: 'DESC',
        createdAt: 'ASC',
      });
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single user per role', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockUserPerRole));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('userPerRoleId', id);
      expect(result.value).toEqual(mockUserPerRole);
    });
  });

  describe('create', () => {
    it('should create a new user per role', async () => {
      // Arrange
      const createDto: NewUserPerRoleDto = {
        userId: 'user-id',
        roleId: 'role-id',
      };
      service.create.mockResolvedValue(Result.ok(mockUserPerRole));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userPerRoleId: 'mock-ulid',
          userId: createDto.userId,
          roleId: createDto.roleId,
        }),
      );
      expect(result.value).toEqual(mockUserPerRole);
    });
  });

  describe('update', () => {
    it('should update an existing user per role', async () => {
      // Arrange
      const updateDto: UpdateUserPerRoleDto = {
        userId: 'new-user-id',
        roleId: 'new-role-id',
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockUserPerRole));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'userPerRoleId',
        id,
        expect.objectContaining({
          userId: updateDto.userId,
          roleId: updateDto.roleId,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockUserPerRole);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const updateDto: UpdateUserPerRoleDto = {
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockUserPerRole));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'userPerRoleId',
        id,
        expect.objectContaining({
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockUserPerRole);
    });
  });

  describe('delete', () => {
    it('should delete a user per role', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('userPerRoleId', id);
      expect(result.value).toBe(true);
    });
  });
});
