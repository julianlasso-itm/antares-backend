import Result from '@common/utils/result/result.util';
import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { Test, TestingModule } from '@nestjs/testing';
import KnowledgeGapNotesRepository from '@repositories/knowledge-gaps/knowledge-gap-notes.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { KnowledgeGapNotesService } from './knowledge-gap-notes.service';

describe('KnowledgeGapNotesService', () => {
  let service: KnowledgeGapNotesService;
  let repository: KnowledgeGapNotesRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<KnowledgeGapNotes>>;

  beforeEach(async () => {
    queryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
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
        KnowledgeGapNotesService,
        {
          provide: KnowledgeGapNotesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<KnowledgeGapNotesService>(KnowledgeGapNotesService);
    repository = module.get<KnowledgeGapNotesRepository>(
      KnowledgeGapNotesRepository,
    );
  });

  describe('findAll', () => {
    it('should return a Result with FindAllResponse', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const mockData = [new KnowledgeGapNotes()];
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
      const searchField = ['observation'];
      const searchTerm = 'test';

      // Act
      await service.findAll(0, 10, undefined, searchField, searchTerm);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should apply order when provided', async () => {
      // Arrange
      const order: FindOptionsOrder<KnowledgeGapNotes> = {
        createdAt: 'DESC',
      };

      // Act
      await service.findAll(0, 10, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'knowledgeGapNotes.createdAt',
        'DESC',
      );
    });

    it('should apply filters when withDisabled is false', async () => {
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
        'knowledgeGapNotes.status != :withDisabled',
        { withDisabled },
      );
    });

    it('should apply knowledgeGap filter when filter is provided', async () => {
      // Arrange
      const filter = 'testKnowledgeGapId';

      // Act
      await service.findAll(0, 10, undefined, undefined, undefined, filter);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'knowledgeGap.knowledgeGapId = :filter',
        { filter },
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'knowledgeGap.deletedAt IS NULL',
      );
    });
  });

  describe('applyRelations', () => {
    it('should apply left join with knowledgeGap', async () => {
      // Arrange & Act
      await service.findAll(0, 10);

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'knowledgeGapNotes.knowledgeGap',
        'knowledgeGap',
      );
    });
  });

  describe('applyDefaultFilters', () => {
    it('should apply deletedAt filter by default', async () => {
      // Arrange & Act
      await service.findAll(0, 10);

      // Assert
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'knowledgeGapNotes.deletedAt IS NULL',
      );
    });
  });
});
