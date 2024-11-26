import { NewDomainKnowledgeLevelsRequestDto } from '@assessments/dto/new-domain-knowledge-levels-request.dto';
import { UpdateDomainKnowledgeLevelsRequestDto } from '@assessments/dto/update-domain-knowledge-levels-request.dto';
import { DomainKnowledgeLevelsService } from '@assessments/services/domain-knowledge-levels.service';
import Result from '@common/utils/result/result.util';
import { DomainKnowledgeLevels } from '@entities/assessments/domain-knowledge-levels.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { DomainKnowledgeLevelsController } from './domain-knowledge-levels.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('DomainKnowledgeLevelsController', () => {
  let controller: DomainKnowledgeLevelsController;
  let service: jest.Mocked<DomainKnowledgeLevelsService>;

  const mockDomainKnowledgeLevel = new DomainKnowledgeLevels();

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOneWithFilter: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainKnowledgeLevelsController],
      providers: [
        {
          provide: DomainKnowledgeLevelsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DomainKnowledgeLevelsController>(
      DomainKnowledgeLevelsController,
    );
    service = module.get(DomainKnowledgeLevelsService);
  });

  describe('findAll', () => {
    it('should return paginated domain knowledge levels', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const search = 'test';
      const filter = 'filter';
      const mockResponse = new FindAllResponse([mockDomainKnowledgeLevel], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(page, size, search, filter);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        page,
        size,
        { status: 'DESC', createdAt: 'ASC' },
        [],
        search,
        filter,
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOneWithFilter', () => {
    it('should return filtered domain knowledge level', async () => {
      // Arrange
      const levelId = 'level1';
      const domainKnowledgeId = 'domain1';
      service.findOneWithFilter.mockResolvedValue(
        Result.ok(mockDomainKnowledgeLevel),
      );

      // Act
      const result = await controller.findOneWithFilter(
        levelId,
        domainKnowledgeId,
      );

      // Assert
      expect(service.findOneWithFilter).toHaveBeenCalledWith({
        domainKnowledgeId,
        levelId,
      });
      expect(result.value).toEqual(mockDomainKnowledgeLevel);
    });
  });

  describe('findOne', () => {
    it('should return a single domain knowledge level', async () => {
      // Arrange
      const id = 'test-id';
      service.findOne.mockResolvedValue(Result.ok(mockDomainKnowledgeLevel));

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(
        'domainKnowledgeLevelId',
        id,
      );
      expect(result.value).toEqual(mockDomainKnowledgeLevel);
    });
  });

  describe('create', () => {
    it('should create a new domain knowledge level', async () => {
      // Arrange
      const request: NewDomainKnowledgeLevelsRequestDto = {
        domainKnowledgeId: 'domain1',
        configurationLevelId: 'config1',
        levelId: 'level1',
      };
      service.create.mockResolvedValue(Result.ok(mockDomainKnowledgeLevel));

      // Act
      const result = await controller.create(request);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          domainKnowledgeLevelId: 'mock-ulid',
          domainKnowledgeId: request.domainKnowledgeId,
          configurationLevelId: request.configurationLevelId,
          levelId: request.levelId,
        }),
      );
      expect(result.value).toEqual(mockDomainKnowledgeLevel);
    });
  });

  describe('update', () => {
    it('should update a domain knowledge level', async () => {
      // Arrange
      const id = 'test-id';
      const request: UpdateDomainKnowledgeLevelsRequestDto = {
        domainKnowledgeId: 'domain1',
        configurationLevelId: 'config1',
        levelId: 'level1',
        status: true,
      };
      service.update.mockResolvedValue(Result.ok(mockDomainKnowledgeLevel));

      // Act
      const result = await controller.update(request, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'domainKnowledgeLevelId',
        id,
        expect.objectContaining({
          domainKnowledgeId: request.domainKnowledgeId,
          configurationLevelId: request.configurationLevelId,
          levelId: request.levelId,
          status: request.status,
        }),
      );
      expect(result.value).toEqual(mockDomainKnowledgeLevel);
    });
  });

  describe('delete', () => {
    it('should delete a domain knowledge level', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('domainKnowledgeLevelId', id);
      expect(result.value).toBe(true);
    });
  });
});
