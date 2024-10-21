import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '@repositories/find-all.response';
import TechnologyPerRoleRepository from '@repositories/projects-management/technology-per-role.repository';
import { Brackets, FindOptionsOrder } from 'typeorm';

@Injectable()
export class TechnologyPerRoleService extends BaseService<
  TechnologyPerRole,
  TechnologyPerRoleRepository
> {
  constructor(protected readonly repository: TechnologyPerRoleRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<TechnologyPerRole>,
    searchField?: Array<keyof TechnologyPerRole> | Array<string>,
    searchTerm?: string,
    filter?: string,
    withDisabled?: boolean,
  ): Promise<Result<FindAllResponse<TechnologyPerRole>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('technologyPerRole');

    // Condición para excluir registros eliminados
    queryBuilder.where('technologyPerRole.deletedAt IS NULL');

    if (withDisabled === false) {
      queryBuilder.andWhere('technologyPerRole.status != :withDisabled', {
        withDisabled,
      });
    }

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere('technologyPerRole.roleId = :filter', {
        filter,
      });
      queryBuilder.orWhere('technologyPerRole.technologyStackId = :filter', {
        filter,
      });
      queryBuilder.orWhere(
        'technologyPerRole.technologyStack.projectId = :filter',
        {
          filter,
        },
      );
      queryBuilder.orWhere(
        'technologyPerRole.technologyStack.technologyItemId = :filter',
        {
          filter,
        },
      );
      queryBuilder.orWhere(
        'technologyPerRole.technologyStack.project.customerId = :filter',
        {
          filter,
        },
      );
    }

    // Agregar condiciones de búsqueda si existen
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(${field}) ILIKE unaccent(:searchTerm) OR word_similarity(${field}, :searchTerm) > 0.2)`;

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
    // if (order) {
    //   Object.entries(order).forEach(([key, value]) => {
    //     if (typeof value === 'object') {
    //       // Ordenar por el campo anidado: role.name
    //       Object.entries(value).forEach(([subKey, subValue]) => {
    //         queryBuilder.addOrderBy(
    //           `${key}.${subKey}`,
    //           subValue as 'ASC' | 'DESC',
    //         );
    //       });
    //     } else {
    //       // Ordenar por los campos simples de technologyPerRole
    //       queryBuilder.addOrderBy(`${key}`, value as 'ASC' | 'DESC');
    //     }
    //   });
    // }

    // Paginación
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }

    // Relaciones
    queryBuilder
      .leftJoinAndSelect('technologyPerRole.role', 'role')
      .leftJoinAndSelect('technologyPerRole.technologyStack', 'technologyStack')
      .leftJoinAndSelect('technologyStack.technologyItem', 'technologyItem')
      .leftJoinAndSelect('technologyStack.project', 'project')
      .leftJoinAndSelect('project.customer', 'customer');

    // Selección de campos específicos
    queryBuilder.select([
      'technologyPerRole.technologyPerRoleId',
      'technologyPerRole.roleId',
      'technologyPerRole.technologyStackId',
      'technologyPerRole.status',
      'technologyPerRole.createdAt',
      'technologyPerRole.updatedAt',
      'technologyPerRole.deletedAt',
      'role.name',
      'technologyStack.weight',
      'project.projectId',
      'project.name',
      'customer.customerId',
      'customer.name',
      'technologyItem.technologyItemId',
      'technologyItem.name',
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }
}
