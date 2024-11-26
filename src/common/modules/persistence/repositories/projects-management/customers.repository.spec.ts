import { Customers } from '@entities/projects-management/customers.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CustomersRepository from './customers.repository';

describe('CustomersRepository', () => {
  let customersRepository: CustomersRepository;
  let repository: Repository<Customers>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomersRepository,
        {
          provide: getRepositoryToken(Customers),
          useClass: Repository,
        },
      ],
    }).compile();

    customersRepository = module.get<CustomersRepository>(CustomersRepository);
    repository = module.get<Repository<Customers>>(
      getRepositoryToken(Customers),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(customersRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = customersRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});