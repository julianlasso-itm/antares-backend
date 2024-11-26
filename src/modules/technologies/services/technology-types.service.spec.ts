import { Test, TestingModule } from '@nestjs/testing';
import TechnologyTypesRepository from '@repositories/technologies/technology-types.repository';
import { TechnologyTypesService } from './technology-types.service';

describe('TechnologyTypesService', () => {
  let service: TechnologyTypesService;
  let repository: TechnologyTypesRepository;

  beforeEach(async () => {
    // Arrange
    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologyTypesService,
        {
          provide: TechnologyTypesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TechnologyTypesService>(TechnologyTypesService);
    repository = module.get<TechnologyTypesRepository>(
      TechnologyTypesRepository,
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Act - constructor is called implicitly in beforeEach

      // Assert
      expect(service).toBeDefined();
      expect(repository).toBeDefined();
    });
  });
});
