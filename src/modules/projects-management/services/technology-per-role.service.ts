import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '@repositories/find-all.response';
import TechnologyPerRoleRepository from '@repositories/projects-management/technology-per-role.repository';
import { Brackets, FindOptionsOrder, FindOptionsOrderValue } from 'typeorm';

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
    order?:
      | FindOptionsOrder<TechnologyPerRole>
      | Record<string, Record<string, FindOptionsOrderValue>>,
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

    // Agregar joins necesarios (solo una vez para cada tabla)
    queryBuilder
      .leftJoin('technologyPerRole.role', 'role')
      .leftJoin('technologyPerRole.technologyStack', 'technologyStack')
      .leftJoin('technologyStack.technologyItem', 'technologyItem')
      .leftJoin('technologyStack.project', 'project')
      .leftJoin('project.customer', 'customer');

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('technologyPerRole.roleId = :filter', { filter })
            .orWhere('technologyPerRole.technologyStackId = :filter', {
              filter,
            })
            .orWhere('technologyStack.projectId = :filter', { filter })
            .orWhere('technologyStack.technologyItemId = :filter', { filter })
            .orWhere('project.customerId = :filter', { filter });
        }),
      );
    }

    // Agregar condiciones de búsqueda si existen
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(${field}) ILIKE unaccent(:searchTerm) OR word_similarity(${field as string}, :searchTerm) > 0.2)`;

            if (index === 0) {
              qb.where(condition, { searchTerm: `%${searchTerm}%` });
            } else {
              qb.orWhere(condition, { searchTerm: `%${searchTerm}%` });
            }
          });
        }),
      );
    }

    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        if (typeof value === 'object') {
          // Ordenar por el campo anidado
          Object.entries(value).forEach(([subKey, subValue]) => {
            queryBuilder.addOrderBy(
              `${key}.${subKey}`,
              subValue as 'ASC' | 'DESC',
            );
          });
        } else {
          // Ordenar por los campos simples de technologyPerRole
          queryBuilder.addOrderBy(
            `technologyPerRole.${key}`,
            value as 'ASC' | 'DESC',
          );
        }
      });
    }

    // Paginación
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }

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

  async findOnlyRolesByProject(
    projectId: string,
  ): Promise<Result<FindAllResponse<{ roleId: string; name: string }>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('technologyPerRole');

    // Condición para excluir registros eliminados
    queryBuilder.where('technologyPerRole.deletedAt IS NULL');

    // Agregar condición de filtro por projectId
    queryBuilder.andWhere('technologyStack.projectId = :projectId', {
      projectId,
    });

    // Agregar joins necesarios
    queryBuilder
      .leftJoin('technologyPerRole.role', 'role')
      .leftJoin('technologyPerRole.technologyStack', 'technologyStack');

    // Selección de campos específicos
    queryBuilder.select([
      'DISTINCT(role.roleId) as "roleId"',
      'role.name as name',
    ]);

    // Ejecutar la consulta
    const result = await queryBuilder.getRawMany();

    return Result.ok({
      data: result,
      total: result.length,
    });
  }
}
