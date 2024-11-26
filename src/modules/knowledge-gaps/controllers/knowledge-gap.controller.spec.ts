import Result from '@common/utils/result/result.util';
import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { NewKnowledgeGapRequestDto } from '@knowledge-gaps/dto/new-knowledge-gap-request.dto';
import { UpdateKnowledgeGapRequestDto } from '@knowledge-gaps/dto/update-knowledge-gap-request.dto';
import { KnowledgeGapsService } from '@knowledge-gaps/services/knowledge-gap.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { KnowledgeGapsController } from './knowledge-gap.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('KnowledgeGapsController', () => {
  let controller: KnowledgeGapsController;
  let service: jest.Mocked<KnowledgeGapsService>;

  const mockKnowledgeGap = new KnowledgeGaps();
  mockKnowledgeGap.knowledgeGapId = 'test-id';
  mockKnowledgeGap.title = 'Test gap';
  mockKnowledgeGap.observation = 'Test observation';
  mockKnowledgeGap.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeGapsController],
      providers: [
        {
          provide: KnowledgeGapsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<KnowledgeGapsController>(KnowledgeGapsController);
    service = module.get(KnowledgeGapsService);
  });

  describe('findAll', () => {
    it('should return paginated knowledge gaps', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const search = 'test';
      const filter = 'filter';
      const mockResponse = new FindAllResponse([mockKnowledgeGap], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(page, size, search, filter);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        expect.any(Object),
        ['title', 'observation'],
        search,
        filter,
        false,
      );
      expect(result.value.data).toContain(mockKnowledgeGap);
      expect(result.value.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single knowledge gap', async () => {
      // Arrange
      const id = 'test-id';
      const mockResult = Result.ok(mockKnowledgeGap);
      service.findOne.mockResolvedValue(mockResult);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('knowledgeGapId', id);
      expect(result.value).toEqual(mockKnowledgeGap);
    });
  });

  describe('create', () => {
    it('should create a new knowledge gap', async () => {
      // Arrange
      const createDto: NewKnowledgeGapRequestDto = {
        assessmentId: 'test-assessment-id',
        domainKnowledgeId: 'test-domain-id',
        title: 'Test gap',
        observation: 'Test observation',
      };
      const mockResult = Result.ok(mockKnowledgeGap);
      service.create.mockResolvedValue(mockResult);

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          knowledgeGapId: 'mock-ulid',
          assessmentId: createDto.assessmentId,
          domainKnowledgeId: createDto.domainKnowledgeId,
          title: createDto.title,
          observation: createDto.observation,
        }),
      );
      expect(result.value).toEqual(mockKnowledgeGap);
    });
  });

  describe('update', () => {
    it('should update an existing knowledge gap', async () => {
      // Arrange
      const id = 'test-id';
      const updateDto: UpdateKnowledgeGapRequestDto = {
        title: 'Updated gap',
        observation: 'Updated observation',
        status: false,
      };
      const mockResult = Result.ok(mockKnowledgeGap);
      service.update.mockResolvedValue(mockResult);

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'knowledgeGapId',
        id,
        expect.objectContaining({
          title: updateDto.title,
          observation: updateDto.observation,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockKnowledgeGap);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const id = 'test-id';
      const updateDto: UpdateKnowledgeGapRequestDto = {
        title: 'Updated gap',
      };
      const mockResult = Result.ok(mockKnowledgeGap);
      service.update.mockResolvedValue(mockResult);

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'knowledgeGapId',
        id,
        expect.objectContaining({
          title: updateDto.title,
        }),
      );
      expect(result.value).toEqual(mockKnowledgeGap);
    });
  });

  describe('delete', () => {
    it('should delete a knowledge gap', async () => {
      // Arrange
      const id = 'test-id';
      const mockResult = Result.ok(true);
      service.delete.mockResolvedValue(mockResult);

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('knowledgeGapId', id);
      expect(result.value).toBe(true);
    });
  });
});
