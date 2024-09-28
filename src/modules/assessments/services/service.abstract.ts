import { ObjectLiteral } from 'typeorm';
import { Result } from '../../../common';
import { BaseRepository } from '../../../common/modules/persistence';

export abstract class BaseService<
  Entity extends ObjectLiteral,
  Repository extends BaseRepository<Entity>,
> {
  constructor(protected readonly repository: Repository) {}

  async findAll(): Promise<Result<Entity[]>> {
    return await this.repository.findAll();
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
