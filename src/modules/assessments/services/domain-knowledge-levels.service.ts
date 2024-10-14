import { Injectable } from '@nestjs/common';
import { Brackets, FindOptionsOrder } from 'typeorm';
import { BaseService, Result } from '../../../common';
import { DomainKnowledgeLevels } from '../../../common/modules/persistence/entities';
import {
  DomainKnowledgeLevelsRepository,
  FindAllResponse,
} from '../../../common/modules/persistence/repositories';

@Injectable()
export class DomainKnowledgeLevelsService extends BaseService<
  DomainKnowledgeLevels,
  DomainKnowledgeLevelsRepository
> {
  constructor(protected readonly repository: DomainKnowledgeLevelsRepository) {
    super(repository);
  }

  async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<DomainKnowledgeLevels>,
    searchField?: Array<keyof DomainKnowledgeLevels>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<DomainKnowledgeLevels>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('domainKnowledgeLevels');

    // Condición para excluir registros eliminados
    queryBuilder.where('domainKnowledgeLevels.deletedAt IS NULL');

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere(
        'domainKnowledgeLevels.domainKnowledgeId = :filter',
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
            const condition = `(unaccent(domainKnowledgeLevels.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(domainKnowledgeLevels.${field as string}, :searchTerm) > 0.2)`;

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
          `domainKnowledgeLevels.${key}`,
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
      .leftJoinAndSelect(
        'domainKnowledgeLevels.domainKnowledge',
        'domainKnowledge',
      )
      .leftJoinAndSelect('domainKnowledge.technologyItem', 'technologyItem')
      .leftJoinAndSelect('technologyItem.technologyType', 'technologyType')
      .leftJoinAndSelect('domainKnowledgeLevels.level', 'level')
      .leftJoinAndSelect(
        'domainKnowledgeLevels.configurationLevel',
        'configurationLevel',
      );

    // Selección de campos específicos
    queryBuilder.select([
      'domainKnowledgeLevels.domainKnowledgeId',
      'domainKnowledgeLevels.domainKnowledgeLevelId',
      'domainKnowledgeLevels.configurationLevelId',
      'domainKnowledgeLevels.levelId',
      'domainKnowledgeLevels.status',
      'domainKnowledgeLevels.createdAt',
      'domainKnowledgeLevels.updatedAt',
      'domainKnowledgeLevels.deletedAt',
      'domainKnowledge.domainKnowledgeId',
      'domainKnowledge.domain', // Nombre del dominio
      'technologyItem.technologyItemId',
      'technologyItem.name', // Nombre de la tecnología
      'technologyType.technologyTypeId',
      'technologyType.name', // Nombre del tipo de tecnología
      'level.levelId',
      'level.name', // Nombre del nivel
      'configurationLevel.configurationLevelId',
      'configurationLevel.name', // Nombre de la configuración
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    return Result.ok({
      data: result,
      total,
    });
  }
}
