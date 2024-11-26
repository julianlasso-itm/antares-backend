import { Test, TestingModule } from '@nestjs/testing';
import RolesSecurityRepository from '@repositories/security/roles-security.repository';
import { RolesSecurityService } from './roles-security.service';

describe('RolesSecurityService', () => {
  let service: RolesSecurityService;
  let repository: jest.Mocked<RolesSecurityRepository>;

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
        RolesSecurityService,
        {
          provide: RolesSecurityRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<RolesSecurityService>(RolesSecurityService);
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
