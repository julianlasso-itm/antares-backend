import { Test, TestingModule } from '@nestjs/testing';
import ProfessionalsRepository from '@repositories/human-resources/professionals.repository';
import { ProfessionalsService } from './professionals.service';

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;
  let mockRepository: jest.Mocked<ProfessionalsRepository>;

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
        ProfessionalsService,
        {
          provide: ProfessionalsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
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
