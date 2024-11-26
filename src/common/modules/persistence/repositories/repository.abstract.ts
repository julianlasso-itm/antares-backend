import AntaresException from '@common/exceptions/antares.exception';
import Result from '@common/utils/result/result.util';
import {
  DeepPartial,
  FindOptionsOrder,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { FindAllResponse } from './find-all.response';

export abstract class BaseRepository<Entity extends ObjectLiteral> {
  constructor(readonly repository: Repository<Entity>) {}

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

  async findAll(
    page?: number,
    size?: number,
    searchField?: Array<keyof Entity>,
    searchTerm?: string,
    order?: FindOptionsOrder<Entity>,
    withDisabled?: boolean,
  ): Promise<Result<FindAllResponse<Entity>>> {
    const queryBuilder = this.repository.createQueryBuilder('entity');

    queryBuilder.where('entity.deletedAt IS NULL');

    if (withDisabled === false) {
      queryBuilder.andWhere('entity.status != :withDisabled', {
        withDisabled,
      });
    }

    if (searchField && searchTerm) {
      searchField.forEach((field, index) => {
        if (index === 0) {
          queryBuilder.andWhere(
            `(unaccent(entity.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(entity.${field as string}, :search) > 0.2)`,
            { searchTerm: `%${searchTerm}%`, search: searchTerm },
          );
        } else {
          queryBuilder.orWhere(
            `(unaccent(entity.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(entity.${field as string}, :search) > 0.2)`,
            { searchTerm: `%${searchTerm}%`, search: searchTerm },
          );
        }
      });
    }

    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`entity.${key}`, value);
      });
    }

    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }

    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }

  async update(
    id: Partial<Entity>,
    partialEntity: DeepPartial<Entity>,
    updateDate: boolean = true,
  ): Promise<Result<Entity>> {
    try {
      const existingEntity = await this.findOne(id);

      if (existingEntity.isErr) {
        return Result.err(
          new AntaresException('Entity not found or has been deleted'),
        );
      }

      // const updatedEntity = this.repository.merge(existingEntity.value, {
      //   ...partialEntity,
      //   updatedAt: updateDate ? new Date() : existingEntity.value.updatedAt,
      // });

      const updatedEntity = {
        ...existingEntity.value,
        ...partialEntity,
        updatedAt: updateDate ? new Date() : existingEntity.value.updatedAt,
      };

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
