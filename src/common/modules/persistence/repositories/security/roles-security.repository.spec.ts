import { RolesSecurity } from '@entities/security/roles-security.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RolesSecurityRepository from './roles-security.repository';

describe('RolesSecurityRepository', () => {
  let rolesSecurityRepository: RolesSecurityRepository;
  let repository: Repository<RolesSecurity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesSecurityRepository,
        {
          provide: getRepositoryToken(RolesSecurity),
          useClass: Repository,
        },
      ],
    }).compile();

    rolesSecurityRepository = module.get<RolesSecurityRepository>(RolesSecurityRepository);
    repository = module.get<Repository<RolesSecurity>>(getRepositoryToken(RolesSecurity));
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(rolesSecurityRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = rolesSecurityRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});