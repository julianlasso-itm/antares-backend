import Result from '@common/utils/result/result.util';
import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { NewKnowledgeGapNoteRequestDto } from '@knowledge-gaps/dto/new-knowledge-gap-note-request.dto';
import { UpdateKnowledgeGapNoteRequestDto } from '@knowledge-gaps/dto/update-knowledge-gap-note-request.dto';
import { KnowledgeGapNotesService } from '@knowledge-gaps/services/knowledge-gap-notes.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { KnowledgeGapNotesController } from './knowledge-gap-notes.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('KnowledgeGapNotesController', () => {
  let controller: KnowledgeGapNotesController;
  let service: jest.Mocked<KnowledgeGapNotesService>;

  const mockKnowledgeGapNote = new KnowledgeGapNotes();
  mockKnowledgeGapNote.knowledgeGapNoteId = 'test-id';
  mockKnowledgeGapNote.observation = 'Test observation';
  mockKnowledgeGapNote.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeGapNotesController],
      providers: [
        {
          provide: KnowledgeGapNotesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<KnowledgeGapNotesController>(
      KnowledgeGapNotesController,
    );
    service = module.get<jest.Mocked<KnowledgeGapNotesService>>(
      KnowledgeGapNotesService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of knowledge gap notes', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const search = 'test';
      const mockResult = Result.ok(
        new FindAllResponse([mockKnowledgeGapNote], 1),
      );
      service.findAll.mockResolvedValue(mockResult);

      // Act
      const result = await controller.findAll(page, size, search);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        expect.any(Object),
        ['observation'],
        search,
      );
      expect(result.value.data).toContain(mockKnowledgeGapNote);
      expect(result.value.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single knowledge gap note', async () => {
      // Arrange
      const id = 'test-id';
      const mockResult = Result.ok(mockKnowledgeGapNote);
      service.findOne.mockResolvedValue(mockResult);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('knowledgeGapNoteId', id);
      expect(result.value).toEqual(mockKnowledgeGapNote);
    });
  });

  describe('create', () => {
    it('should create a new knowledge gap note', async () => {
      // Arrange
      const createDto: NewKnowledgeGapNoteRequestDto = {
        knowledgeGapId: 'test-kg-id',
        observation: 'Test observation',
      };
      const mockResult = Result.ok(mockKnowledgeGapNote);
      service.create.mockResolvedValue(mockResult);

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          knowledgeGapNoteId: 'mock-ulid',
          knowledgeGapId: createDto.knowledgeGapId,
          observation: createDto.observation,
        }),
      );
      expect(result.value).toEqual(mockKnowledgeGapNote);
    });
  });

  describe('update', () => {
    it('should update an existing knowledge gap note', async () => {
      // Arrange
      const id = 'test-id';
      const updateDto: UpdateKnowledgeGapNoteRequestDto = {
        observation: 'Updated observation',
        status: false,
      };
      const mockResult = Result.ok(mockKnowledgeGapNote);
      service.update.mockResolvedValue(mockResult);

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'knowledgeGapNoteId',
        id,
        expect.objectContaining({
          observation: updateDto.observation,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockKnowledgeGapNote);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const id = 'test-id';
      const updateDto: UpdateKnowledgeGapNoteRequestDto = {
        observation: 'Updated observation',
      };
      const mockResult = Result.ok(mockKnowledgeGapNote);
      service.update.mockResolvedValue(mockResult);

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'knowledgeGapNoteId',
        id,
        expect.objectContaining({
          observation: updateDto.observation,
        }),
      );
      expect(result.value).toEqual(mockKnowledgeGapNote);
    });
  });

  describe('delete', () => {
    it('should delete a knowledge gap note', async () => {
      // Arrange
      const id = 'test-id';
      const mockResult = Result.ok(true);
      service.delete.mockResolvedValue(mockResult);

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('knowledgeGapNoteId', id);
      expect(result.value).toBe(true);
    });
  });
});
