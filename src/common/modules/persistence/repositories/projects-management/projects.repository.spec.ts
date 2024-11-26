import { Projects } from '@entities/projects-management/projects.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProjectsRepository from './projects.repository';

describe('ProjectsRepository', () => {
  let projectsRepository: ProjectsRepository;
  let repository: Repository<Projects>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsRepository,
        {
          provide: getRepositoryToken(Projects),
          useClass: Repository,
        },
      ],
    }).compile();

    projectsRepository = module.get<ProjectsRepository>(ProjectsRepository);
    repository = module.get<Repository<Projects>>(getRepositoryToken(Projects));
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(projectsRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = projectsRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
