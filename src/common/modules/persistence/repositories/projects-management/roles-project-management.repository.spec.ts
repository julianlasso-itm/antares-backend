import { RolesProjectManagement } from '@entities/projects-management/roles-projects-management.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RolesProjectManagementRepository from './roles-project-management.repository';

describe('RolesProjectManagementRepository', () => {
  let rolesProjectManagementRepository: RolesProjectManagementRepository;
  let repository: Repository<RolesProjectManagement>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesProjectManagementRepository,
        {
          provide: getRepositoryToken(RolesProjectManagement),
          useClass: Repository,
        },
      ],
    }).compile();

    rolesProjectManagementRepository =
      module.get<RolesProjectManagementRepository>(
        RolesProjectManagementRepository,
      );
    repository = module.get<Repository<RolesProjectManagement>>(
      getRepositoryToken(RolesProjectManagement),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(rolesProjectManagementRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = rolesProjectManagementRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
