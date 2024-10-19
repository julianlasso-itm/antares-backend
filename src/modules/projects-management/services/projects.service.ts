import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { Projects } from '@entities/projects-management/projects.entity';
import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '@repositories/find-all.response';
import ProjectsRepository from '@repositories/projects-management/projects.repository';
import { Brackets, FindOptionsOrder } from 'typeorm';

@Injectable()
export class ProjectsService extends BaseService<Projects, ProjectsRepository> {
  constructor(protected readonly repository: ProjectsRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<Projects>,
    searchField?: Array<keyof Projects>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<Projects>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('projects');

    // Condición para excluir registros eliminados
    queryBuilder.where('projects.deletedAt IS NULL');

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere('projects.customerId = :filter', {
        filter,
      });
    }

    // Agregar condiciones de búsqueda si existen
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(projects.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(projects.${field as string}, :searchTerm) > 0.2)`;

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
        queryBuilder.addOrderBy(`projects.${key}`, value as 'ASC' | 'DESC');
      });
    }

    // Paginación
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }

    // Relaciones
    queryBuilder.leftJoinAndSelect('projects.customer', 'customer');

    // Selección de campos específicos
    queryBuilder.select([
      'projects.projectId',
      'projects.customerId',
      'projects.name',
      'projects.status',
      'projects.createdAt',
      'projects.updatedAt',
      'projects.deletedAt',
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
