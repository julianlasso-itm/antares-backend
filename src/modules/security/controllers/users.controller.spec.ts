import Result from '@common/utils/result/result.util';
import { Users } from '@entities/security/users.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { NewUserDto } from '@security/dto/new-user.dto';
import { UpdateUserDto } from '@security/dto/update-user.dto';
import { UsersService } from '@security/services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  const mockUser = new Users();
  mockUser.userId = 'test-id';
  mockUser.name = 'Test User';
  mockUser.email = 'test@example.com';
  mockUser.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
  });

  describe('findAll', () => {
    it('should return paginated users list', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockUser], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));
      const page = 0;
      const size = 10;
      const search = 'test';

      // Act
      const result = await controller.findAll(page, size, search);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        { status: 'DESC', createdAt: 'ASC' },
        ['name', 'email'],
        search,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockUser));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('userId', id);
      expect(result.value).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const createDto: NewUserDto = {
        name: 'Test User',
        email: 'test@example.com',
      };
      service.create.mockResolvedValue(Result.ok(mockUser));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: expect.any(String),
          name: createDto.name,
          email: createDto.email,
        }),
      );
      expect(result.value).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      // Arrange
      const updateDto: UpdateUserDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
        status: false,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockUser));

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'userId',
        id,
        expect.objectContaining({
          name: updateDto.name,
          email: updateDto.email,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockUser);
    });

    it('should only update provided fields', async () => {
      // Arrange
      const updateDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockUser));

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'userId',
        id,
        expect.objectContaining({
          name: updateDto.name,
        }),
      );
      expect(service.update).toHaveBeenCalledWith(
        'userId',
        id,
        expect.not.objectContaining({
          email: expect.any(String),
          status: expect.any(Boolean),
        }),
      );
      expect(result.value).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('userId', id);
      expect(result.value).toBe(true);
    });
  });
});
