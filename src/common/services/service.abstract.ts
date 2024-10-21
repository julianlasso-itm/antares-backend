import Result from '@common/utils/result/result.util';
import { FindAllResponse } from '@repositories/find-all.response';
import { BaseRepository } from '@repositories/repository.abstract';
import { FindOptionsOrder, ObjectLiteral } from 'typeorm';

export abstract class BaseService<
  Entity extends ObjectLiteral,
  Repository extends BaseRepository<Entity>,
> {
  constructor(protected readonly repository: Repository) {}

  async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<Entity>,
    searchField?: Array<keyof Entity> | Array<string>,
    searchTerm?: string,
    filter?: string,
    withDisabled?: boolean,
  ): Promise<Result<FindAllResponse<Entity>>> {
    return await this.repository.findAll(
      page,
      size,
      searchField,
      searchTerm,
      order,
      withDisabled,
    );
  }

  async findOne(field: string, id: string): Promise<Result<Entity>> {
    return await this.repository.findOne({ [field]: id } as Partial<Entity>);
  }

  async findOneWithFilter(filter: Partial<Entity>): Promise<Result<Entity>> {
    return await this.repository.findOne(filter);
  }

  async create(level: Entity): Promise<Result<Entity>> {
    return await this.repository.create(level);
  }

  async update(
    field: string,
    id: string,
    level: Entity,
  ): Promise<Result<Entity>> {
    return await this.repository.update(
      { [field]: id } as Partial<Entity>,
      level,
    );
  }

  async delete(field: string, id: string): Promise<Result<boolean>> {
    return await this.repository.delete({ [field]: id } as Partial<Entity>);
  }
}
