import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { ConfigurationPerLevel } from '@entities/assessments/configuration-per-level.entity';
import { Injectable } from '@nestjs/common';
import ConfigurationPerLevelRepository from '@repositories/assessments/configuration-per-level.repository';
import { FindAllResponse } from '@repositories/find-all.response';
import { FindOptionsOrder, IsNull } from 'typeorm';

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
