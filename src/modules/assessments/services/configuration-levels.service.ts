import AntaresException from '@common/exceptions/antares.exception';
import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import { Injectable } from '@nestjs/common';
import ConfigurationLevelsRepository from '@repositories/assessments/configuration-levels.repository';

@Injectable()
export class ConfigurationLevelsService extends BaseService<
  ConfigurationLevels,
  ConfigurationLevelsRepository
> {
  constructor(protected readonly repository: ConfigurationLevelsRepository) {
    super(repository);
  }

  async getFullConfiguration(): Promise<Result<ConfigurationLevels>> {
    const queryBuilder =
      this.repository.repository.createQueryBuilder('configurationLevel');

    queryBuilder.where('configurationLevel.deletedAt IS NULL');
    queryBuilder.andWhere('configurationLevel.status = true');
    queryBuilder.andWhere('ratingScale.deletedAt IS NULL');
    queryBuilder.andWhere('ratingScale.status = true');
    queryBuilder.andWhere('configurationPerLevel.deletedAt IS NULL');
    queryBuilder.andWhere('configurationPerLevel.status = true');
    queryBuilder.andWhere('level.deletedAt IS NULL');
    queryBuilder.andWhere('level.status = true');

    queryBuilder.leftJoinAndSelect(
      'configurationLevel.ratingScales',
      'ratingScale',
    );
    queryBuilder.leftJoinAndSelect(
      'configurationLevel.configurationPerLevels',
      'configurationPerLevel',
    );
    queryBuilder.leftJoinAndSelect('configurationPerLevel.level', 'level');

    queryBuilder.orderBy('ratingScale.position', 'ASC');
    queryBuilder.addOrderBy('configurationPerLevel.position', 'ASC');

    const data = await queryBuilder.getMany();
    if (data.length === 0) {
      return Result.err(new AntaresException('No configuration found'));
    }
    return Result.ok(data[0]);
  }
}
