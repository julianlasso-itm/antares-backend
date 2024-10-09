import { FindOptionsOrder, ObjectLiteral } from 'typeorm';
import { BaseRepository } from '../modules/persistence';
import { FindAllResponse } from '../modules/persistence/repositories/find-all.response';
import { Result } from '../utils';

export abstract class BaseService<
  Entity extends ObjectLiteral,
  Repository extends BaseRepository<Entity>,
> {
  constructor(protected readonly repository: Repository) {}

  async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<Entity>,
    searchField?: Array<keyof Entity>,
    searchTerm?: string,
  ): Promise<Result<FindAllResponse<Entity>>> {
    return await this.repository.findAll(
      page,
      size,
      searchField,
      searchTerm,
      order,
    );
  }

  async findOne(field: string, id: string): Promise<Result<Entity>> {
    return await this.repository.findOne({ [field]: id } as Partial<Entity>);
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
