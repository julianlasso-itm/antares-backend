import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '@repositories/find-all.response';
import RolePerProfessionalRepository from '@repositories/projects-management/role-per-professional.repository';
import { Brackets, FindOptionsOrder } from 'typeorm';

@Injectable()
export class RolePerProfessionalService extends BaseService<
  RolePerProfessional,
  RolePerProfessionalRepository
> {
  constructor(protected readonly repository: RolePerProfessionalRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<RolePerProfessional>,
    searchField?: Array<keyof RolePerProfessional> | Array<string>,
    searchTerm?: string,
    filter?: string,
    withDisabled?: boolean,
    isActiveOnAccount?: boolean,
  ): Promise<Result<FindAllResponse<RolePerProfessional>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('rolePerProfessional');

    // Condición para excluir registros eliminados
    queryBuilder.where('rolePerProfessional.deletedAt IS NULL');

    if (isActiveOnAccount === true) {
      queryBuilder.andWhere('rolePerProfessional.endDate IS NULL');
    }

    if (withDisabled === false) {
      queryBuilder.andWhere('rolePerProfessional.status != :withDisabled', {
        withDisabled,
      });
    }

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere('rolePerProfessional.roleId = :filter', {
        filter,
      });
      queryBuilder.orWhere('rolePerProfessional.professionalId = :filter', {
        filter,
      });
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
          // Ordenar por los campos simples de rolePerProfessional
          queryBuilder.addOrderBy(
            `rolePerProfessional.${key}`,
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
      .leftJoinAndSelect('rolePerProfessional.role', 'role')
      .leftJoinAndSelect('rolePerProfessional.professional', 'professional')
      .leftJoinAndSelect('role.technologyPerRoles', 'technologyPerRoles')
      .leftJoinAndSelect(
        'technologyPerRoles.technologyStack',
        'technologyStack',
      )
      .leftJoinAndSelect('technologyStack.project', 'project')
      .leftJoinAndSelect('project.customer', 'customer');

    // Selección de campos específicos
    queryBuilder.select([
      'rolePerProfessional.rolePerProfessionalId',
      'rolePerProfessional.roleId',
      'rolePerProfessional.professionalId',
      'rolePerProfessional.startDate',
      'rolePerProfessional.endDate',
      'rolePerProfessional.status',
      'rolePerProfessional.createdAt',
      'rolePerProfessional.updatedAt',
      'rolePerProfessional.deletedAt',
      'role.roleId',
      'role.name',
      'professional.professionalId',
      'professional.name',
      'technologyPerRoles.technologyPerRoleId',
      'technologyStack.technologyStackId',
      'project.projectId',
      'project.name',
      'customer.customerId',
      'customer.name',
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }
}
