import { Injectable } from '@nestjs/common';
import { Brackets, FindOptionsOrder } from 'typeorm';
import { Result } from '../../../common';
import { TechnologyStack } from '../../../common/modules/persistence/entities';
import {
  FindAllResponse,
  TechnologyStackRepository,
} from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class TechnologyStackService extends BaseService<
  TechnologyStack,
  TechnologyStackRepository
> {
  constructor(protected readonly repository: TechnologyStackRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<TechnologyStack>,
    searchField?: Array<keyof TechnologyStack> | Array<string>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<TechnologyStack>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('technologyStack');

    // Condición para excluir registros eliminados
    queryBuilder.where('technologyStack.deletedAt IS NULL');

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere('technologyStack.projectId = :filter', {
        filter,
      });
    }

    // Agregar condiciones de búsqueda si existen
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(${field as string}, :searchTerm) > 0.2)`;

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
        if (typeof value === 'object') {
          // Ordenar por el campo anidado: project.name
          Object.entries(value).forEach(([subKey, subValue]) => {
            queryBuilder.addOrderBy(
              `${key}.${subKey}`,
              subValue as 'ASC' | 'DESC',
            );
          });
        } else {
          // Ordenar por los campos simples de technologyStack
          queryBuilder.addOrderBy(
            `technologyStack.${key}`,
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
    queryBuilder
      .leftJoinAndSelect('technologyStack.project', 'project')
      .leftJoinAndSelect('technologyStack.technologyItem', 'technologyItem')
      .leftJoinAndSelect('technologyItem.technologyType', 'technologyType');

    // Selección de campos específicos
    queryBuilder.select([
      'technologyStack.technologyStackId',
      'technologyStack.projectId',
      'technologyStack.technologyItemId',
      'technologyStack.weight',
      'technologyStack.status',
      'technologyStack.createdAt',
      'technologyStack.updatedAt',
      'technologyStack.deletedAt',
      'project.projectId',
      'project.customerId',
      'project.name',
      'technologyItem.technologyItemId',
      'technologyItem.name',
      'technologyType.technologyTypeId',
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
