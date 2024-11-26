import { NewDomainKnowledgeDto } from '@assessments/dto/new-domain-knowledge.dto';
import { UpdateDomainKnowledgeDto } from '@assessments/dto/update-domain-knowledge.dto';
import { DomainKnowledgeService } from '@assessments/services/domain-knowledge.service';
import Result from '@common/utils/result/result.util';
import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { DomainKnowledgeController } from './domain-knowledge.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('DomainKnowledgeController', () => {
  let controller: DomainKnowledgeController;
  let service: jest.Mocked<DomainKnowledgeService>;

  const mockDomainKnowledge = new DomainKnowledge();
  mockDomainKnowledge.domainKnowledgeId = 'test-id';
  mockDomainKnowledge.domain = 'Test Domain';
  mockDomainKnowledge.topic = 'Test Topic';
  mockDomainKnowledge.technologyItemId = 'tech-1';
  mockDomainKnowledge.weight = 1;
  mockDomainKnowledge.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findAllCompletedAssessmentForItemTechnology: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainKnowledgeController],
      providers: [
        {
          provide: DomainKnowledgeService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DomainKnowledgeController>(
      DomainKnowledgeController,
    );
    service = module.get(DomainKnowledgeService);
  });

  describe('findAll', () => {
    it('should return paginated domain knowledge', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const search = 'test';
      const filter = 'filter';
      const mockResponse = new FindAllResponse([mockDomainKnowledge], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(page, size, search, filter);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        { status: 'DESC', createdAt: 'ASC' },
        ['domain', 'topic'],
        search,
        filter,
      );
      expect(result.value.data).toContain(mockDomainKnowledge);
      expect(result.value.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single domain knowledge', async () => {
      // Arrange
      const id = 'test-id';
      service.findOne.mockResolvedValue(Result.ok(mockDomainKnowledge));

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('domainKnowledgeId', id);
      expect(result.value).toEqual(mockDomainKnowledge);
    });
  });

  describe('findAllCompletedAssessment', () => {
    it('should return completed assessments for item technology', async () => {
      // Arrange
      const assessmentId = 'assessment-1';
      const technologyItemId = 'tech-1';
      service.findAllCompletedAssessmentForItemTechnology.mockResolvedValue(
        Result.ok([mockDomainKnowledge]),
      );

      // Act
      const result = await controller.findAllCompletedAssessment(
        assessmentId,
        technologyItemId,
      );

      // Assert
      expect(
        service.findAllCompletedAssessmentForItemTechnology,
      ).toHaveBeenCalledWith(assessmentId, technologyItemId);
      expect(result.value).toContainEqual(mockDomainKnowledge);
    });
  });

  describe('create', () => {
    it('should create a new domain knowledge', async () => {
      // Arrange
      const request: NewDomainKnowledgeDto = {
        technologyItemId: 'tech-1',
        domain: 'Test Domain',
        topic: 'Test Topic',
        weight: 1,
      };
      service.create.mockResolvedValue(Result.ok(mockDomainKnowledge));

      // Act
      const result = await controller.create(request);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          domainKnowledgeId: 'mock-ulid',
          technologyItemId: request.technologyItemId,
          domain: request.domain,
          topic: request.topic,
          weight: request.weight,
        }),
      );
      expect(result.value).toEqual(mockDomainKnowledge);
    });
  });

  describe('update', () => {
    it('should update an existing domain knowledge', async () => {
      // Arrange
      const id = 'test-id';
      const request: UpdateDomainKnowledgeDto = {
        domain: 'Updated Domain',
        topic: 'Updated Topic',
        weight: 0.5,
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockDomainKnowledge));

      // Act
      const result = await controller.update(request, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'domainKnowledgeId',
        id,
        expect.objectContaining({
          domain: request.domain,
          topic: request.topic,
          weight: request.weight,
          status: request.status,
        }),
      );
      expect(result.value).toEqual(mockDomainKnowledge);
    });
  });

  describe('delete', () => {
    it('should delete a domain knowledge', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('domainKnowledgeId', id);
      expect(result.value).toBe(true);
    });
  });
});
