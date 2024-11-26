import Result from '@common/utils/result/result.util';
import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { Test, TestingModule } from '@nestjs/testing';
import KnowledgeGapsRepository from '@repositories/knowledge-gaps/knowledge-gaps.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { KnowledgeGapsService } from './knowledge-gap.service';

describe('KnowledgeGapsService', () => {
  let service: KnowledgeGapsService;
  let repository: KnowledgeGapsRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<KnowledgeGaps>>;

  beforeEach(async () => {
    queryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    } as any;

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnowledgeGapsService,
        {
          provide: KnowledgeGapsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<KnowledgeGapsService>(KnowledgeGapsService);
    repository = module.get<KnowledgeGapsRepository>(KnowledgeGapsRepository);
  });

  describe('findAll', () => {
    it('should return a Result with FindAllResponse', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const mockData = [new KnowledgeGaps()];
      const mockTotal = 1;
      queryBuilder.getManyAndCount.mockResolvedValueOnce([mockData, mockTotal]);

      // Act
      const result = await service.findAll(page, size);

      // Assert
      expect(result).toBeInstanceOf(Result);
      expect(result.isOk).toBeTruthy();
      expect(result.value.data).toEqual(mockData);
      expect(result.value.total).toEqual(mockTotal);
    });

    it('should apply pagination when page and size are provided', async () => {
      // Arrange
      const page = 1;
      const size = 10;

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(page * size);
      expect(queryBuilder.take).toHaveBeenCalledWith(size);
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['title'];
      const searchTerm = 'test';

      // Act
      await service.findAll(0, 10, undefined, searchField, searchTerm);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should apply order when provided', async () => {
      // Arrange
      const order: FindOptionsOrder<KnowledgeGaps> = {
        createdAt: 'DESC',
      };

      // Act
      await service.findAll(0, 10, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'knowledgeGaps.createdAt',
        'DESC',
      );
    });

    it('should apply filters when filter is provided', async () => {
      // Arrange
      const filter = 'testProfessionalId';

      // Act
      await service.findAll(0, 10, undefined, undefined, undefined, filter);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'rolePerProfessional.professionalId = :filter',
        { filter },
      );
    });

    it('should apply default filters for non-deleted records', async () => {
      // Arrange & Act
      await service.findAll();

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'knowledgeGaps.deletedAt IS NULL',
      );
    });

    it('should apply relations correctly', async () => {
      // Arrange & Act
      await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'knowledgeGaps.assessment',
        'assessment',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'assessment.rolePerProfessional',
        'rolePerProfessional',
      );
    });

    it('should handle withDisabled flag correctly', async () => {
      // Arrange
      const withDisabled = false;

      // Act
      await service.findAll(
        0,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        withDisabled,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'assessment.status != :withDisabled',
        { withDisabled },
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'rolePerProfessional.status != :withDisabled',
        { withDisabled },
      );
    });
  });
});
