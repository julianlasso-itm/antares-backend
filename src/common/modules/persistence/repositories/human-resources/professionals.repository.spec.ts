import { Professionals } from '@entities/human-resources/professionals.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProfessionalsRepository from './professionals.repository';

describe('ProfessionalsRepository', () => {
  let professionalsRepository: ProfessionalsRepository;
  let repository: Repository<Professionals>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProfessionalsRepository,
        {
          provide: getRepositoryToken(Professionals),
          useClass: Repository,
        },
      ],
    }).compile();

    professionalsRepository = module.get<ProfessionalsRepository>(ProfessionalsRepository);
    repository = module.get<Repository<Professionals>>(getRepositoryToken(Professionals));
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(professionalsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = professionalsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});