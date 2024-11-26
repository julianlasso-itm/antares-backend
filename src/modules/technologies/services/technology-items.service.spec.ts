import Result from '@common/utils/result/result.util';
import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import { Test } from '@nestjs/testing';
import TechnologyItemsRepository from '@repositories/technologies/technology-items.repository';
import { FindOptionsOrder } from 'typeorm';
import { TechnologyItemsService } from './technology-items.service';

describe('TechnologyItemsService', () => {
  let service: TechnologyItemsService;
  let repository: TechnologyItemsRepository;
  let queryBuilder: any;

  beforeEach(async () => {
    queryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
      getMany: jest.fn(),
    };

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        TechnologyItemsService,
        {
          provide: TechnologyItemsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TechnologyItemsService>(TechnologyItemsService);
  });

  describe('findAll', () => {
    it('should return all technology items with default parameters', async () => {
      // Arrange
      const expectedResult = [[{ id: '1', name: 'Tech 1' }], 1];
      queryBuilder.getManyAndCount.mockResolvedValue(expectedResult);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toBeInstanceOf(Result);
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual(expectedResult[0]);
      expect(result.value.total).toEqual(expectedResult[1]);
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'technologyItem.deletedAt IS NULL',
      );
    });

    it('should apply pagination when page and size are provided', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);

      // Act
      await service.findAll(page, size);

      // Assert
      expect(queryBuilder.skip).toHaveBeenCalledWith(page * size);
      expect(queryBuilder.take).toHaveBeenCalledWith(size);
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['name'];
      const searchTerm = 'test';
      queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        searchField,
        searchTerm,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should apply filter when provided', async () => {
      // Arrange
      const filter = 'type1';
      queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);

      // Act
      await service.findAll(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        filter,
      );

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'technologyItem.technologyTypeId = :filter',
        { filter },
      );
    });

    it('should apply ordering when order is provided', async () => {
      // Arrange
      const order: FindOptionsOrder<TechnologyItems> = {
        name: 'ASC',
        technologyType: { name: 'DESC' },
      };
      queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'technologyItem.name',
        'ASC',
      );
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'technologyType.name',
        'DESC',
      );
    });
  });

  describe('findAllCompletedAssessment', () => {
    const mockAssessmentId = 'test-assessment-id';

    it('should return all completed assessments for a given assessmentId', async () => {
      // Arrange
      const expectedResult = [
        { id: '1', name: 'Tech 1' },
        { id: '2', name: 'Tech 2' },
      ];
      queryBuilder.getMany.mockResolvedValue(expectedResult);

      // Act
      const result = await service.findAllCompletedAssessment(mockAssessmentId);

      // Assert
      expect(result).toBeInstanceOf(Result);
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(expectedResult);

      // Verify relations were applied
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'technologyItem.domainKnowledges',
        'domainKnowledges',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledges.domainAssessmentScores',
        'domainAssessmentScores',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainAssessmentScores.assessment',
        'assessment',
      );

      // Verify conditions were applied
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'technologyItem.deletedAt IS NULL',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'domainKnowledges.deletedAt IS NULL',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'domainAssessmentScores.deletedAt IS NULL',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'assessment.deletedAt IS NULL',
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'assessment.assessmentId = :assessmentId',
        { assessmentId: mockAssessmentId },
      );

      // Verify ordering was applied
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'technologyItem.name',
        'ASC',
      );
    });

    it('should handle empty results', async () => {
      // Arrange
      queryBuilder.getMany.mockResolvedValue([]);

      // Act
      const result = await service.findAllCompletedAssessment(mockAssessmentId);

      // Assert
      expect(result).toBeInstanceOf(Result);
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual([]);
    });

    it('should handle database errors', async () => {
      // Arrange
      const error = new Error('Database error');
      queryBuilder.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(
        service.findAllCompletedAssessment(mockAssessmentId),
      ).rejects.toThrow(error);
    });
  });
});
