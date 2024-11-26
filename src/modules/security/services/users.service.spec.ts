import { Test, TestingModule } from '@nestjs/testing';
import UsersRepository from '@repositories/security/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: jest.Mocked<UsersRepository>;

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
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // Already handled in beforeEach

      // Act
      // Constructor is called implicitly when service is instantiated

      // Assert
      expect(service).toBeDefined();
      expect(service['repository']).toBeDefined();
      expect(service['repository']).toBe(mockRepository);
    });
  });
});
