import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TechnologyPerRoleRepository from './technology-per-role.repository';

describe('TechnologyPerRoleRepository', () => {
  let technologyPerRoleRepository: TechnologyPerRoleRepository;
  let repository: Repository<TechnologyPerRole>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TechnologyPerRoleRepository,
        {
          provide: getRepositoryToken(TechnologyPerRole),
          useClass: Repository,
        },
      ],
    }).compile();

    technologyPerRoleRepository = module.get<TechnologyPerRoleRepository>(
      TechnologyPerRoleRepository,
    );
    repository = module.get<Repository<TechnologyPerRole>>(
      getRepositoryToken(TechnologyPerRole),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(technologyPerRoleRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = technologyPerRoleRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});