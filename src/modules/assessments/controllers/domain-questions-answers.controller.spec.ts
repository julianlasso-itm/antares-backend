import { NewDomainQuestionsAnswersRequestDto } from '@assessments/dto/new-domain-questions-answers-request.dto';
import { UpdateDomainQuestionsAnswersRequestDto } from '@assessments/dto/update-domain-questions-answers-request.dto';
import { DomainQuestionsAnswersService } from '@assessments/services/domain-questions-answers.service';
import Result from '@common/utils/result/result.util';
import { DomainQuestionsAnswers } from '@entities/assessments/domain-questions-answers.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { DomainQuestionsAnswersController } from './domain-questions-answers.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('DomainQuestionsAnswersController', () => {
  let controller: DomainQuestionsAnswersController;
  let service: jest.Mocked<DomainQuestionsAnswersService>;

  const mockDomainQuestionsAnswer = new DomainQuestionsAnswers();
  mockDomainQuestionsAnswer.domainQuestionAnswerId = 'test-id';
  mockDomainQuestionsAnswer.question = 'test question';
  mockDomainQuestionsAnswer.answer = 'test answer';
  mockDomainQuestionsAnswer.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainQuestionsAnswersController],
      providers: [
        {
          provide: DomainQuestionsAnswersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DomainQuestionsAnswersController>(
      DomainQuestionsAnswersController,
    );
    service = module.get(DomainQuestionsAnswersService);
  });

  describe('findAll', () => {
    it('should return paginated domain questions answers', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const search = 'test';
      const mockResponse = new FindAllResponse([mockDomainQuestionsAnswer], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(page, size, search);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        { status: 'DESC', createdAt: 'ASC' },
        ['question', 'answer'],
        search,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single domain questions answer', async () => {
      // Arrange
      const id = 'test-id';
      service.findOne.mockResolvedValue(Result.ok(mockDomainQuestionsAnswer));

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(
        'domainQuestionAnswerId',
        id,
      );
      expect(result.value).toEqual(mockDomainQuestionsAnswer);
    });
  });

  describe('create', () => {
    it('should create with domainKnowledgeId when domainKnowledgeLevelId is not provided', async () => {
      // Arrange
      const request: NewDomainQuestionsAnswersRequestDto = {
        domainKnowledgeId: 'dk-1',
        domainKnowledgeLevelId: null,
        question: 'test question',
        answer: 'test answer',
      };
      service.create.mockResolvedValue(Result.ok(mockDomainQuestionsAnswer));

      // Act
      const result = await controller.create(request);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          domainQuestionAnswerId: 'mock-ulid',
          domainKnowledgeId: request.domainKnowledgeId,
          question: request.question,
          answer: request.answer,
        }),
      );
      expect(result.value).toEqual(mockDomainQuestionsAnswer);
    });

    it('should create with domainKnowledgeLevelId when provided', async () => {
      // Arrange
      const request: NewDomainQuestionsAnswersRequestDto = {
        domainKnowledgeId: 'dk-1',
        domainKnowledgeLevelId: 'dkl-1',
        question: 'test question',
        answer: 'test answer',
      };
      service.create.mockResolvedValue(Result.ok(mockDomainQuestionsAnswer));

      // Act
      const result = await controller.create(request);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          domainQuestionAnswerId: 'mock-ulid',
          domainKnowledgeLevelId: request.domainKnowledgeLevelId,
          question: request.question,
          answer: request.answer,
        }),
      );
      expect(result.value).toEqual(mockDomainQuestionsAnswer);
    });
  });

  describe('update', () => {
    it('should update a domain questions answer', async () => {
      // Arrange
      const id = 'test-id';
      const request: UpdateDomainQuestionsAnswersRequestDto = {
        question: 'updated question',
        answer: 'updated answer',
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockDomainQuestionsAnswer));

      // Act
      const result = await controller.update(request, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'domainQuestionAnswerId',
        id,
        expect.objectContaining({
          question: request.question,
          answer: request.answer,
          status: request.status,
        }),
      );
      expect(result.value).toEqual(mockDomainQuestionsAnswer);
    });

    it('should update with domainKnowledgeId and clear domainKnowledgeLevelId', async () => {
      // Arrange
      const id = 'test-id';
      const request: UpdateDomainQuestionsAnswersRequestDto = {
        domainKnowledgeId: 'dk-1',
        question: 'updated question',
      };
      service.update.mockResolvedValue(Result.ok(mockDomainQuestionsAnswer));

      // Act
      const _ = await controller.update(request, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'domainQuestionAnswerId',
        id,
        expect.objectContaining({
          domainKnowledgeId: request.domainKnowledgeId,
          domainKnowledgeLevelId: null,
        }),
      );
    });
  });

  describe('delete', () => {
    it('should delete a domain questions answer', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('domainQuestionAnswerId', id);
      expect(result.value).toBe(true);
    });
  });
});
