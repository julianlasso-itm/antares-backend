import { Injectable } from '@nestjs/common';
import { FindOptionsOrder, IsNull } from 'typeorm';
import { BaseService, Result } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { ConfigurationPerLevel } from '../../../common/modules/persistence/entities';
import { ConfigurationPerLevelRepository } from '../../../common/modules/persistence/repositories/assessments';

@Injectable()
export class ConfigurationPerLevelService extends BaseService<
  ConfigurationPerLevel,
  ConfigurationPerLevelRepository
> {
  constructor(protected readonly repository: ConfigurationPerLevelRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<ConfigurationPerLevel>,
  ): Promise<Result<FindAllResponse<ConfigurationPerLevel>>> {
    const repository = this.repository.repository;
    const [result, total] = await repository.findAndCount({
      where: {
        deletedAt: IsNull(),
        configurationLevel: {
          deletedAt: IsNull(),
        },
        level: {
          deletedAt: IsNull(),
        },
      },
      order,
      skip: page !== undefined && size !== undefined ? page * size : 0,
      take: size,
      relations: {
        configurationLevel: true,
        level: true,
      },
      select: {
        configurationPerLevelId: true,
        configurationLevelId: true,
        levelId: true,
        position: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        configurationLevel: {
          name: true,
        },
        level: {
          name: true,
        },
      },
    });

    return Result.ok({
      data: result,
      total,
    });
  }
}
