import AntaresException from '@common/exceptions/antares.exception';
import Result from '@common/utils/result/result.util';
import { FindAllResponse } from '@repositories/find-all.response';
import { BaseRepository } from '@repositories/repository.abstract';
import { FindOptionsOrder, Repository } from 'typeorm';
import { BaseService } from './service.abstract';

// Mock entity class
class MockEntity {
  constructor(
    public id: number,
    public name: string,
    public status?: boolean,
    public deletedAt?: Date | null,
  ) {}
}

// Mock repository class
class MockRepository extends BaseRepository<MockEntity> {
  constructor(repository: Repository<MockEntity>) {
    super(repository);
  }
}

// Mock service class extending BaseService
class TestService extends BaseService<MockEntity, MockRepository> {
  constructor(repository: MockRepository) {
    super(repository);
  }
}

describe('BaseService', () => {
  let service: TestService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new TestService(mockRepository);
  });

  describe('findAll', () => {
    it('should return paginated results successfully', async () => {
      // Arrange
      const entities = [
        new MockEntity(1, 'Entity 1'),
        new MockEntity(2, 'Entity 2'),
      ];
      const response: FindAllResponse<MockEntity> = {
        data: entities,
        total: 2,
      };
      const expectedResponse: FindAllResponse<MockEntity> = {
        data: entities,
        total: 2,
      };
      mockRepository.findAll.mockResolvedValue(Result.ok(response));

      // Act
      const result = await service.findAll(
        0,
        10,
        { name: 'ASC' } as FindOptionsOrder<MockEntity>,
        ['name'],
        'search',
        'filter',
        false,
      );

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(expectedResponse);
      expect(mockRepository.findAll).toHaveBeenCalledWith(
        0,
        10,
        ['name'],
        'search',
        { name: 'ASC' },
        false,
      );
    });

    it('should handle repository errors', async () => {
      // Arrange
      mockRepository.findAll.mockResolvedValue(
        Result.err(new AntaresException('Database error')),
      );
      const messageExpected = 'Database error';

      // Act
      const result = await service.findAll();

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageExpected);
    });
  });

  describe('findOne', () => {
    it('should find entity by field and id successfully', async () => {
      // Arrange
      const mockEntity = new MockEntity(1, 'Test Entity');
      const mockEntityExpected = new MockEntity(1, 'Test Entity');
      mockRepository.findOne.mockResolvedValue(Result.ok(mockEntity));

      // Act
      const result = await service.findOne('id', '1');

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockEntityExpected);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: '1' });
    });

    it('should handle not found entity', async () => {
      // Arrange
      const messageExpected = 'Record not found';
      mockRepository.findOne.mockResolvedValue(
        Result.err(new AntaresException('Record not found')),
      );

      // Act
      const result = await service.findOne('id', '999');

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageExpected);
    });
  });

  describe('findOneWithFilter', () => {
    it('should find entity by filter successfully', async () => {
      // Arrange
      const mockEntity = new MockEntity(1, 'Test Entity');
      const mockEntityExpected = new MockEntity(1, 'Test Entity');
      const filter = { name: 'Test Entity', status: true };
      mockRepository.findOne.mockResolvedValue(Result.ok(mockEntity));

      // Act
      const result = await service.findOneWithFilter(filter);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockEntityExpected);
      expect(mockRepository.findOne).toHaveBeenCalledWith(filter);
    });

    it('should handle not found entity with filter', async () => {
      // Arrange
      const filter = { name: 'Non Existent', status: false };
      const messageExpected = 'Record not found';
      mockRepository.findOne.mockResolvedValue(
        Result.err(new AntaresException('Record not found')),
      );

      // Act
      const result = await service.findOneWithFilter(filter);

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageExpected);
      expect(mockRepository.findOne).toHaveBeenCalledWith(filter);
    });

    it('should handle repository errors', async () => {
      // Arrange
      const filter = { id: 1 };
      const messageExpected = 'Database error';
      mockRepository.findOne.mockResolvedValue(
        Result.err(new AntaresException('Database error')),
      );

      // Act
      const result = await service.findOneWithFilter(filter);

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageExpected);
    });

    it('should handle complex filter conditions', async () => {
      // Arrange
      const mockEntity = new MockEntity(1, 'Test Entity');
      const mockEntityExpected = new MockEntity(1, 'Test Entity');
      const complexFilter = {
        name: 'Test Entity',
        status: true,
        deletedAt: null,
      };
      mockRepository.findOne.mockResolvedValue(Result.ok(mockEntity));

      // Act
      const result = await service.findOneWithFilter(complexFilter);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockEntityExpected);
      expect(mockRepository.findOne).toHaveBeenCalledWith(complexFilter);
    });
  });

  describe('create', () => {
    it('should create entity successfully', async () => {
      // Arrange
      const newEntity = new MockEntity(1, 'New Entity');
      const newEntityExpected = new MockEntity(1, 'New Entity');
      mockRepository.create.mockResolvedValue(Result.ok(newEntity));

      // Act
      const result = await service.create(newEntity);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(newEntityExpected);
      expect(mockRepository.create).toHaveBeenCalledWith(newEntity);
    });

    it('should handle creation errors', async () => {
      // Arrange
      const messageExpected = 'Creation failed';
      mockRepository.create.mockResolvedValue(
        Result.err(new AntaresException('Creation failed')),
      );

      // Act
      const result = await service.create(new MockEntity(1, 'Test'));

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageExpected);
    });
  });

  describe('update', () => {
    it('should update entity successfully', async () => {
      // Arrange
      const updatedEntity = new MockEntity(1, 'Updated Entity');
      const updatedEntityExpected = new MockEntity(1, 'Updated Entity');
      mockRepository.update.mockResolvedValue(Result.ok(updatedEntity));

      // Act
      const result = await service.update('id', '1', updatedEntity);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(updatedEntityExpected);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { id: '1' },
        updatedEntity,
      );
    });

    it('should handle update errors', async () => {
      // Arrange
      const messageErrorExpected = 'Update failed';
      mockRepository.update.mockResolvedValue(
        Result.err(new AntaresException('Update failed')),
      );

      // Act
      const result = await service.update('id', '1', new MockEntity(1, 'Test'));

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageErrorExpected);
    });
  });

  describe('delete', () => {
    it('should delete entity successfully', async () => {
      // Arrange
      mockRepository.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await service.delete('id', '1');

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith({ id: '1' });
    });

    it('should handle deletion errors', async () => {
      // Arrange
      const messageErrorExpected = 'Deletion failed';
      mockRepository.delete.mockResolvedValue(
        Result.err(new AntaresException('Deletion failed')),
      );

      // Act
      const result = await service.delete('id', '1');

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageErrorExpected);
    });
  });
});
