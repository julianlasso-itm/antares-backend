import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { RatingScale } from '@entities/assessments/rating-scale.entity';
import { Injectable } from '@nestjs/common';
import RatingScaleRepository from '@repositories/assessments/rating-scale.repository';
import { FindAllResponse } from '@repositories/find-all.response';
import { Brackets, FindOptionsOrder } from 'typeorm';

@Injectable()
export class RatingScaleService extends BaseService<
  RatingScale,
  RatingScaleRepository
> {
  constructor(protected readonly repository: RatingScaleRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<RatingScale>,
    searchField?: Array<keyof RatingScale>,
    searchTerm?: string,
  ): Promise<Result<FindAllResponse<RatingScale>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('ratingScale');

    // Condición para excluir registros eliminados
    queryBuilder.where('ratingScale.deletedAt IS NULL');

    // Agregar condiciones de búsqueda
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(ratingScale.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(ratingScale.${field as string}, :searchTerm) > 0.2)`;

            if (index === 0) {
              qb.where(condition, { searchTerm: `%${searchTerm}%` });
            } else {
              qb.orWhere(condition, { searchTerm: `%${searchTerm}%` });
            }
          });
        }),
      );
    }

    // Ordenar resultados si se especifica
    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        if (typeof value === 'object' && key === 'configurationLevel') {
          // Ordenar por el campo anidado: configurationLevel.name
          Object.entries(value).forEach(([subKey, subValue]) => {
            queryBuilder.addOrderBy(
              `configurationLevel.${subKey}`,
              subValue as 'ASC' | 'DESC',
            );
          });
        } else {
          // Ordenar por los campos simples de ratingScale
          queryBuilder.addOrderBy(
            `ratingScale.${key}`,
            value as 'ASC' | 'DESC',
          );
        }
      });
    }

    // Paginación
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }

    // Relaciones
    queryBuilder.leftJoinAndSelect(
      'ratingScale.configurationLevel',
      'configurationLevel',
    );

    // Selección de campos específicos
    queryBuilder.select([
      'ratingScale.ratingScaleId',
      'ratingScale.name',
      'ratingScale.description',
      'ratingScale.value',
      'ratingScale.position',
      'ratingScale.configurationLevelId',
      'ratingScale.status',
      'ratingScale.createdAt',
      'ratingScale.updatedAt',
      'ratingScale.deletedAt',
      'configurationLevel.name',
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }
}
