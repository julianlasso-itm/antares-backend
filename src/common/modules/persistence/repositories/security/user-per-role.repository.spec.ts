import { UserPerRole } from '@entities/security/user-per-role.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserPerRoleRepository from './user-per-role.repository';

describe('UserPerRoleRepository', () => {
  let userPerRoleRepository: UserPerRoleRepository;
  let repository: Repository<UserPerRole>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserPerRoleRepository,
        {
          provide: getRepositoryToken(UserPerRole),
          useClass: Repository,
        },
      ],
    }).compile();

    userPerRoleRepository = module.get<UserPerRoleRepository>(
      UserPerRoleRepository,
    );
    repository = module.get<Repository<UserPerRole>>(
      getRepositoryToken(UserPerRole),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(userPerRoleRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = userPerRoleRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
