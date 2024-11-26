import { Test, TestingModule } from '@nestjs/testing';
import RolesProjectManagementRepository from '@repositories/projects-management/roles-project-management.repository';
import { RolesProjectManagementService } from './roles-project-management.service';

describe('RolesProjectManagementService', () => {
  let service: RolesProjectManagementService;
  let mockRepository: jest.Mocked<RolesProjectManagementRepository>;

  beforeEach(async () => {
    // Arrange
    mockRepository = {
      repository: {
        createQueryBuilder: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesProjectManagementService,
        {
          provide: RolesProjectManagementRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RolesProjectManagementService>(
      RolesProjectManagementService,
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // Already handled in beforeEach

      // Act
      // Constructor is called implicitly when service is instantiated

      // Assert
      expect(service).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // Already handled in beforeEach

      // Act
      const repository = service['repository'];

      // Assert
      expect(repository).toBeDefined();
      expect(repository).toBe(mockRepository);
    });
  });
});
