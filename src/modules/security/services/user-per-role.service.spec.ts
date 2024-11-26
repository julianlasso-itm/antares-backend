import { Test, TestingModule } from '@nestjs/testing';
import UserPerRoleRepository from '@repositories/security/user-per-role.repository';
import { UserPerRoleService } from './user-per-role.service';

describe('UserPerRoleService', () => {
  let service: UserPerRoleService;
  let repository: jest.Mocked<UserPerRoleRepository>;

  beforeEach(async () => {
    // Arrange
    repository = {
      repository: {
        createQueryBuilder: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPerRoleService,
        {
          provide: UserPerRoleRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UserPerRoleService>(UserPerRoleService);
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange - already handled in beforeEach

      // Act - constructor is called implicitly when service is instantiated

      // Assert
      expect(service).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange - already handled in beforeEach

      // Act
      const repoProperty = service['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBe(repository);
    });
  });
});
