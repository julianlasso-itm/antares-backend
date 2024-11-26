import { Customers } from '@entities/projects-management/customers.entity';
import { Test, TestingModule } from '@nestjs/testing';
import CustomersRepository from '@repositories/projects-management/customers.repository';
import { SelectQueryBuilder } from 'typeorm';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: CustomersRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<Customers>>;

  const mockQueryBuilder = () => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
  });

  beforeEach(async () => {
    queryBuilder = mockQueryBuilder() as any;

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CustomersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getReport', () => {
    it('should get report with all relations and conditions applied', async () => {
      // Arrange
      const mockCustomers = [new Customers()];
      queryBuilder.getMany.mockResolvedValue(mockCustomers);

      // Act
      const result = await service.getReport();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockCustomers);
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(15);
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'customer.deletedAt IS NULL',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'projects.deletedAt IS NULL',
      );
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'customer.customerId',
        'ASC',
      );
    });

    it('should handle empty results', async () => {
      // Arrange
      queryBuilder.getMany.mockResolvedValue([]);

      // Act
      const result = await service.getReport();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual([]);
    });

    it('should apply all required relations', async () => {
      // Arrange
      const expectedRelations = [
        ['customer.projects', 'projects'],
        ['projects.technologyStacks', 'technologyStacks'],
        ['technologyStacks.technologyPerRoles', 'technologyPerRoles'],
        ['technologyPerRoles.role', 'role'],
        ['role.rolePerProfessionals', 'rolePerProfessionals'],
        ['rolePerProfessionals.professional', 'professional'],
        ['rolePerProfessionals.assessments', 'assessments'],
        ['assessments.domainAssessmentScores', 'domainAssessmentScores'],
        ['domainAssessmentScores.configurationLevels', 'configurationLevels'],
        [
          'configurationLevels.configurationPerLevels',
          'configurationPerLevels',
        ],
        ['configurationPerLevels.level', 'level'],
        ['assessments.knowledgeGaps', 'knowledgeGaps'],
        ['knowledgeGaps.knowledgeGapNotes', 'knowledgeGapNotes'],
        ['technologyStacks.technologyItem', 'technologyItem'],
        ['technologyItem.technologyType', 'technologyType'],
      ];

      // Act
      await service.getReport();

      // Assert
      expectedRelations.forEach(([relation, alias]) => {
        expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
          relation,
          alias,
        );
      });
    });

    it('should apply correct ordering', async () => {
      // Arrange & Act
      await service.getReport();

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'customer.customerId',
        'ASC',
      );
    });

    it('should apply null deletion conditions', async () => {
      // Arrange & Act
      await service.getReport();

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'customer.deletedAt IS NULL',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'projects.deletedAt IS NULL',
      );
    });
  });
});
