import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RolePerProfessionalRepository from './role-per-professional.repository';

describe('RolePerProfessionalRepository', () => {
  let rolePerProfessionalRepository: RolePerProfessionalRepository;
  let repository: Repository<RolePerProfessional>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolePerProfessionalRepository,
        {
          provide: getRepositoryToken(RolePerProfessional),
          useClass: Repository,
        },
      ],
    }).compile();

    rolePerProfessionalRepository = module.get<RolePerProfessionalRepository>(
      RolePerProfessionalRepository,
    );
    repository = module.get<Repository<RolePerProfessional>>(
      getRepositoryToken(RolePerProfessional),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(rolePerProfessionalRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = rolePerProfessionalRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
