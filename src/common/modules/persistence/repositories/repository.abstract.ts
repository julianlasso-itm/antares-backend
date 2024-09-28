import { DeepPartial, IsNull, ObjectLiteral, Repository } from 'typeorm';
import { AntaresException } from '../../../exceptions';
import { Result } from '../../../utils';

export abstract class BaseRepository<Entity extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async create(entity: Entity): Promise<Result<Entity>> {
    try {
      const record = this.repository.create(entity);
      const result = await this.repository.save(record);
      return Result.ok(result);
    } catch (error) {
      return Result.err(new AntaresException(error.message));
    }
  }

  async findOne(conditions: Partial<Entity>): Promise<Result<Entity>> {
    try {
      const record = await this.repository.findOne({
        where: {
          ...conditions,
          deletedAt: IsNull(),
        },
      });

      if (!record) {
        return Result.err(new AntaresException('Record not found'));
      }

      return Result.ok(record);
    } catch (error) {
      return Result.err(new AntaresException(error.message));
    }
  }

  async findAll(conditions: Partial<Entity> = {}): Promise<Result<Entity[]>> {
    try {
      const records = await this.repository.find({
        where: {
          ...conditions,
          deletedAt: IsNull(),
        },
      });

      return Result.ok(records);
    } catch (error) {
      return Result.err(new AntaresException(error.message));
    }
  }

  async update(
    id: Partial<Entity>,
    partialEntity: DeepPartial<Entity>,
    updateDate: boolean = true,
  ): Promise<Result<Entity>> {
    try {
      const existingEntity = await this.findOne(id);

      if (!existingEntity) {
        return Result.err(
          new AntaresException('Entity not found or has been deleted'),
        );
      }

      const updatedEntity = this.repository.merge(existingEntity.value, {
        ...partialEntity,
        updatedAt: updateDate ? new Date() : existingEntity.value.updatedAt,
      });

      const result = await this.repository.save(updatedEntity);

      return Result.ok(result);
    } catch (error) {
      return Result.err(new AntaresException(error.message));
    }
  }

  async delete(id: Partial<Entity>, force?: boolean): Promise<Result<boolean>> {
    const existingEntity = await this.findOne(id);

    if (existingEntity.isErr) {
      return Result.err(new AntaresException('Entity not found'));
    }

    if (force) {
      try {
        await this.repository.delete(id);
        return Result.ok(true);
      } catch (error) {
        return Result.err(new AntaresException(error.message));
      }
    }

    try {
      await this.update(id, {
        deletedAt: new Date(),
      } as unknown as DeepPartial<Entity>);

      return Result.ok(true);
    } catch (error) {
      return Result.err(new AntaresException(error.message));
    }
  }
}
