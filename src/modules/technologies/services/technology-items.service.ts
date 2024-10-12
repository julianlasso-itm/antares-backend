import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { Result } from '../../../common';
import { TechnologyItems } from '../../../common/modules/persistence/entities';
import {
  FindAllResponse,
  TechnologyItemsRepository,
} from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class TechnologyItemsService extends BaseService<
  TechnologyItems,
  TechnologyItemsRepository
> {
  constructor(protected readonly repository: TechnologyItemsRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<TechnologyItems>,
    searchField?: Array<keyof TechnologyItems>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<TechnologyItems>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('technologyItem');

    // Condición para excluir registros eliminados
    queryBuilder.where('technologyItem.deletedAt IS NULL');

    // Agregar condición de filtro
    if (filter) {
      queryBuilder.andWhere('technologyItem.technologyTypeId = :filter', {
        filter,
      });
    }

    // Agregar condiciones de búsqueda
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(technologyItem.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(technologyItem.${field as string}, :searchTerm) > 0.2)`;

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
        if (typeof value === 'object' && key === 'technologyType') {
          // Ordenar por el campo anidado: technologyType.name
          Object.entries(value).forEach(([subKey, subValue]) => {
            queryBuilder.addOrderBy(
              `technologyType.${subKey}`,
              subValue as 'ASC' | 'DESC',
            );
          });
        } else {
          // Ordenar por los campos simples de technologyItem
          queryBuilder.addOrderBy(
            `technologyItem.${key}`,
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
      'technologyItem.technologyType',
      'technologyType',
    );

    // Selección de campos específicos
    queryBuilder.select([
      'technologyItem.technologyItemId',
      'technologyItem.name',
      'technologyItem.description',
      'technologyItem.icon',
      'technologyItem.technologyTypeId',
      'technologyItem.status',
      'technologyItem.createdAt',
      'technologyItem.updatedAt',
      'technologyItem.deletedAt',
      'technologyType.name',
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }
}
