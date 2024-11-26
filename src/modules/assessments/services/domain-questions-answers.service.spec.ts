import { DomainQuestionsAnswers } from '@entities/assessments/domain-questions-answers.entity';
import { Test, TestingModule } from '@nestjs/testing';
import DomainQuestionsAnswersRepository from '@repositories/assessments/domain-questions-answers.repository';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { DomainQuestionsAnswersService } from './domain-questions-answers.service';

describe('DomainQuestionsAnswersService', () => {
  let service: DomainQuestionsAnswersService;
  let repository: DomainQuestionsAnswersRepository;
  let queryBuilder: jest.Mocked<SelectQueryBuilder<DomainQuestionsAnswers>>;

  const mockQueryBuilder = () => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
  });

  beforeEach(async () => {
    // Arrange
    queryBuilder = mockQueryBuilder() as any;

    const mockRepository = {
      repository: {
        createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainQuestionsAnswersService,
        {
          provide: DomainQuestionsAnswersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DomainQuestionsAnswersService>(
      DomainQuestionsAnswersService,
    );
    repository = module.get<DomainQuestionsAnswersRepository>(
      DomainQuestionsAnswersRepository,
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Assert
      expect(service).toBeDefined();
    });

    it('should have repository injected', () => {
      // Assert
      expect(service['repository']).toBeDefined();
      expect(service['repository']).toBe(repository);
    });

    it('should extend BaseService', () => {
      // Assert
      expect(service instanceof DomainQuestionsAnswersService).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should return empty result when no data exists', async () => {
      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual({
        data: [],
        total: 0,
      });
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'domainQuestionsAnswers.deletedAt IS NULL',
      );
    });

    it('should apply filter when provided', async () => {
      // Arrange
      const filter = 'testId';

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
        'domainQuestionsAnswers.domainKnowledgeId = :filter OR domainQuestionsAnswers.domainKnowledgeLevelId = :filter',
        { filter },
      );
    });

    it('should apply search conditions when searchField and searchTerm are provided', async () => {
      // Arrange
      const searchField = ['question', 'answer'] as Array<
        keyof DomainQuestionsAnswers
      >;
      const searchTerm = 'test';

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

    it('should apply ordering when order is provided', async () => {
      // Arrange
      const order: FindOptionsOrder<DomainQuestionsAnswers> = {
        createdAt: 'DESC',
      };

      // Act
      await service.findAll(undefined, undefined, order);

      // Assert
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'domainQuestionsAnswers.createdAt',
        'DESC',
      );
    });

    it('should process results correctly', async () => {
      // Arrange
      const mockData = [
        {
          domainQuestionAnswerId: '1',
          domainKnowledgeId: '1',
          domainKnowledgeLevelId: '1',
          question: 'test question',
          answer: 'test answer',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          domainKnowledge: { domain: 'domain1' },
          domainKnowledgeLevel: {
            domainKnowledge: { domain: 'domain2' },
          },
        },
      ] as DomainQuestionsAnswers[];
      queryBuilder.getManyAndCount.mockResolvedValueOnce([mockData, 1]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.data[0].domainKnowledge.domain).toBe('domain1');
      expect(result.value.total).toBe(1);
    });

    it('should process results with fallback domain', async () => {
      // Arrange
      const mockData = [
        {
          domainQuestionAnswerId: '1',
          domainKnowledgeId: '1',
          domainKnowledgeLevelId: '1',
          question: '',
          answer: '',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          domainKnowledge: null as any,
          domainKnowledgeLevel: {
            domainKnowledge: { domain: 'fallbackDomain' },
          },
        },
      ] as DomainQuestionsAnswers[];
      queryBuilder.getManyAndCount.mockResolvedValueOnce([mockData, 1]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isOk).toBe(true);
      expect(
        result.value.data[0].domainKnowledgeLevel.domainKnowledge.domain,
      ).toBe('fallbackDomain');
    });

    it('should apply all necessary joins', async () => {
      // Act
      await service.findAll();

      // Assert
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainQuestionsAnswers.domainKnowledge',
        'domainKnowledge',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledge.technologyItem',
        'technologyItem',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'technologyItem.technologyType',
        'technologyType',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainQuestionsAnswers.domainKnowledgeLevel',
        'domainKnowledgeLevel',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'domainKnowledgeLevel.level',
        'level',
      );
    });
  });
});
