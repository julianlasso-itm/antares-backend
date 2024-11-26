import Result from '@common/utils/result/result.util';
import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NewRolePerProfessionalDto } from '@projects-management/dto/new-role-per-professional.dto';
import { UpdateRolePerProfessionalDto } from '@projects-management/dto/update-role-per-professional.dto';
import { RolePerProfessionalService } from '@projects-management/services/role-per-professional.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { RolePerProfessionalController } from './role-per-professional.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('RolePerProfessionalController', () => {
  let controller: RolePerProfessionalController;
  let service: jest.Mocked<RolePerProfessionalService>;

  const mockRolePerProfessional = new RolePerProfessional();
  mockRolePerProfessional.rolePerProfessionalId = 'test-id';
  mockRolePerProfessional.roleId = 'role-id';
  mockRolePerProfessional.professionalId = 'professional-id';
  mockRolePerProfessional.startDate = new Date();
  mockRolePerProfessional.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      getAssessmentsByRolePerProfessional: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePerProfessionalController],
      providers: [
        {
          provide: RolePerProfessionalService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RolePerProfessionalController>(
      RolePerProfessionalController,
    );
    service = module.get(RolePerProfessionalService);
  });

  describe('findAll', () => {
    it('should return paginated role per professionals', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockRolePerProfessional], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(
        0,
        10,
        'search',
        'filter',
        true,
        true,
      );

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        {
          status: 'DESC',
          professional: { name: 'ASC' },
          role: { name: 'ASC' },
        },
        ['role.name', 'professional.name'],
        'search',
        'filter',
        true,
        true,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('getAssessmentsByRolePerProfessional', () => {
    it('should return assessments by role per professional', async () => {
      // Arrange
      service.getAssessmentsByRolePerProfessional.mockResolvedValue(
        Result.ok(mockRolePerProfessional),
      );
      const rolePerProfessionalId = 'test-id';
      const levelId = 'level-id';

      // Act
      const result = await controller.getAssessmentsByRolePerProfessional(
        rolePerProfessionalId,
        levelId,
      );

      // Assert
      expect(service.getAssessmentsByRolePerProfessional).toHaveBeenCalledWith(
        rolePerProfessionalId,
        levelId,
      );
      expect(result.value).toEqual(mockRolePerProfessional);
    });
  });

  describe('findOne', () => {
    it('should return a single role per professional', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockRolePerProfessional));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('rolePerProfessionalId', id);
      expect(result.value).toEqual(mockRolePerProfessional);
    });
  });

  describe('create', () => {
    it('should create a new role per professional', async () => {
      // Arrange
      const createDto: NewRolePerProfessionalDto = {
        roleId: 'role-id',
        professionalId: 'professional-id',
        startDate: new Date(),
        endDate: null,
      };
      service.create.mockResolvedValue(Result.ok(mockRolePerProfessional));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          rolePerProfessionalId: 'mock-ulid',
          roleId: createDto.roleId,
          professionalId: createDto.professionalId,
          startDate: createDto.startDate,
          endDate: null,
        }),
      );
      expect(result.value).toEqual(mockRolePerProfessional);
    });
  });

  describe('update', () => {
    it('should update an existing role per professional', async () => {
      // Arrange
      const updateDto: UpdateRolePerProfessionalDto = {
        roleId: 'new-role-id',
        startDate: new Date(),
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockRolePerProfessional));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'rolePerProfessionalId',
        id,
        expect.objectContaining({
          roleId: updateDto.roleId,
          startDate: updateDto.startDate,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockRolePerProfessional);
    });
  });

  describe('delete', () => {
    it('should delete a role per professional', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('rolePerProfessionalId', id);
      expect(result.value).toBe(true);
    });
  });
});
