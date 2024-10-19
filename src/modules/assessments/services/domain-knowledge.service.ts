import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import { Injectable } from '@nestjs/common';
import DomainKnowledgeRepository from '@repositories/assessments/domain-knowledge.repository';
import { FindAllResponse } from '@repositories/find-all.response';
import { Brackets, FindOptionsOrder } from 'typeorm';

@Injectable()
export class DomainKnowledgeService extends BaseService<
  DomainKnowledge,
  DomainKnowledgeRepository
> {
  constructor(protected readonly repository: DomainKnowledgeRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<DomainKnowledge>,
    searchField?: Array<keyof DomainKnowledge>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<DomainKnowledge>>> {
    console.log('filter', filter);
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('domainKnowledge');

    // Condición para excluir registros eliminados
    queryBuilder.where('domainKnowledge.deletedAt IS NULL');

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere('domainKnowledge.technologyItemId = :filter', {
        filter,
      });
    }

    // Agregar condiciones de búsqueda
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(domainKnowledge.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(domainKnowledge.${field as string}, :searchTerm) > 0.2)`;

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
        queryBuilder.addOrderBy(
          `domainKnowledge.${key}`,
          value as 'ASC' | 'DESC',
        );
      });
    }

    // Paginación
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }

    // Relaciones
    queryBuilder
      .leftJoinAndSelect('domainKnowledge.technologyItem', 'technologyItem')
      .leftJoinAndSelect('technologyItem.technologyType', 'technologyType');

    // Selección de campos específicos
    queryBuilder.select([
      'domainKnowledge.domainKnowledgeId',
      'domainKnowledge.domain',
      'domainKnowledge.weight',
      'domainKnowledge.topic',
      'domainKnowledge.status',
      'domainKnowledge.createdAt',
      'domainKnowledge.updatedAt',
      'domainKnowledge.deletedAt',
      'domainKnowledge.technologyItemId',
      'technologyItem.name',
      'technologyItem.description',
      'technologyItem.technologyTypeId',
      'technologyType.name',
      'technologyType.description',
      'technologyType.technologyTypeId',
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }
}
