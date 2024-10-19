import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { Levels } from '@entities/assessments/levels.entity';
import { Injectable } from '@nestjs/common';
import { LevelsRepository } from '@repositories/assessments/levels.repository';
import { FindAllResponse } from '@repositories/find-all.response';
import { FindOptionsOrder } from 'typeorm';

@Injectable()
export class LevelsService extends BaseService<Levels, LevelsRepository> {
  constructor(protected readonly repository: LevelsRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<Levels>,
    searchField?: Array<keyof Levels>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<Levels>>> {
    if (filter?.length === 0) {
      return await super.findAll(page, size, order, searchField, searchTerm);
    }

    const queryBuilder = this.repository.repository.createQueryBuilder('level');
    queryBuilder.where('level.deletedAt IS NULL');

    if (filter) {
      queryBuilder
        .innerJoin('level.configurationPerLevels', 'configPerLevel')
        .innerJoin('configPerLevel.configurationLevel', 'configLevel')
        .andWhere('configLevel.configurationLevelId = :filter', {
          filter,
        })
        .andWhere('configLevel.deletedAt IS NULL');
    }

    if (searchField && searchTerm) {
      searchField.forEach((field, index) => {
        if (index === 0) {
          queryBuilder.andWhere(
            `(unaccent(level.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(level.${field as string}, :search) > 0.2)`,
            { searchTerm: `%${searchTerm}%`, search: searchTerm },
          );
        } else {
          queryBuilder.orWhere(
            `(unaccent(level.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(level.${field as string}, :search) > 0.2)`,
            { searchTerm: `%${searchTerm}%`, search: searchTerm },
          );
        }
      });
    }

    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`level.${key}`, value as 'ASC' | 'DESC');
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
}
