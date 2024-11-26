import AntaresException from '@common/exceptions/antares.exception';
import { IsNull, Repository } from 'typeorm';
import { BaseRepository } from './repository.abstract';

// Mock entity para pruebas
interface MockEntity {
  id: number;
  name: string;
  status?: boolean;
  deletedAt?: Date | null;
  updatedAt?: Date;
}

// Mock del QueryBuilder
const mockQueryBuilder = {
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  orWhere: jest.fn().mockReturnThis(),
  addOrderBy: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  getManyAndCount: jest.fn(),
};

// Mock del Repository
const mockRepository: jest.Mocked<Repository<MockEntity>> = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
} as unknown as jest.Mocked<Repository<MockEntity>>;

// Clase concreta para pruebas
class TestRepository extends BaseRepository<MockEntity> {
  constructor() {
    super(mockRepository);
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository;

  beforeEach(() => {
    repository = new TestRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an entity successfully', async () => {
      // Arrange
      const mockEntity: MockEntity = { id: 1, name: 'Test' };
      const mockEntityExpected: MockEntity = { id: 1, name: 'Test' };
      mockRepository.create.mockReturnValue(mockEntity);
      mockRepository.save.mockResolvedValue(mockEntity);

      // Act
      const result = await repository.create(mockEntity);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockEntityExpected);
      expect(mockRepository.create).toHaveBeenCalledWith(mockEntityExpected);
      expect(mockRepository.save).toHaveBeenCalledWith(mockEntityExpected);
    });

    it('should return error when save fails', async () => {
      // Arrange
      const mockEntity: MockEntity = { id: 1, name: 'Test' };
      const error = new Error('Database error');
      const messageErrorExpected = 'Database error';
      mockRepository.create.mockReturnValue(mockEntity);
      mockRepository.save.mockRejectedValue(error);

      // Act
      const result = await repository.create(mockEntity);

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error).toBeInstanceOf(AntaresException);
      expect(result.error.message).toBe(messageErrorExpected);
    });
  });

  describe('findOne', () => {
    it('should find an entity successfully', async () => {
      // Arrange
      const mockEntity: MockEntity = { id: 1, name: 'Test' };
      const mockEntityExpected: MockEntity = { id: 1, name: 'Test' };
      const whereExpected = {
        where: {
          id: 1,
          deletedAt: IsNull(),
        },
      };
      mockRepository.findOne.mockResolvedValue(mockEntity);

      // Act
      const result = await repository.findOne({ id: 1 });

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toEqual(mockEntityExpected);
      expect(mockRepository.findOne).toHaveBeenCalledWith(whereExpected);
    });

    it('should return error when entity is not found', async () => {
      // Arrange
      const messageErrorExpected = 'Record not found';
      mockRepository.findOne.mockResolvedValue(null);

      // Act
      const result = await repository.findOne({ id: 1 });

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageErrorExpected);
    });
  });

  describe('findAll', () => {
    it('should return paginated results successfully', async () => {
      // Arrange
      const mockEntities = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
      ];
      const mockEntitiesExpected = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
      ];
      const whereExpected = 'entity.deletedAt IS NULL';
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockEntities, 2]);

      // Act
      const result = await repository.findAll(
        0,
        10,
        ['name'],
        'test',
        { name: 'ASC' },
        false,
      );

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.data).toEqual(mockEntitiesExpected);
      expect(result.value.total).toBe(2);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        whereExpected,
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an entity successfully', async () => {
      // Arrange
      const existingEntity = { id: 1, name: 'Test', updatedAt: new Date() };
      const updateData = { name: 'Updated Test' };
      const updateDataExpected = { name: 'Updated Test' };
      mockRepository.findOne.mockResolvedValue(existingEntity);
      mockRepository.save.mockResolvedValue({
        ...existingEntity,
        ...updateData,
      });

      // Act
      const result = await repository.update({ id: 1 }, updateData);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value.name).toBe(updateDataExpected.name);
    });

    it('should return error when entity not found', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null);
      const messageErrorExpected = 'Entity not found or has been deleted';

      // Act
      const result = await repository.update({ id: 1 }, { name: 'Updated' });

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageErrorExpected);
    });
  });

  describe('delete', () => {
    it('should soft delete an entity successfully', async () => {
      // Arrange
      const mockEntity = { id: 1, name: 'Test' };
      mockRepository.findOne.mockResolvedValue(mockEntity);
      mockRepository.save.mockResolvedValue({
        ...mockEntity,
        deletedAt: new Date(),
      });

      // Act
      const result = await repository.delete({ id: 1 });

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toBe(true);
    });

    it('should force delete an entity successfully', async () => {
      // Arrange
      const mockEntity = { id: 1, name: 'Test' };
      mockRepository.findOne.mockResolvedValue(mockEntity);
      mockRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      // Act
      const result = await repository.delete({ id: 1 }, true);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.value).toBe(true);
    });

    it('should return error when entity not found', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null);
      const messageErrorExpected = 'Entity not found';

      // Act
      const result = await repository.delete({ id: 1 });

      // Assert
      expect(result.isErr).toBe(true);
      expect(result.error.message).toBe(messageErrorExpected);
    });
  });
});
