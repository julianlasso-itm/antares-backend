import { Injectable } from '@nestjs/common';
import { Brackets, FindOptionsOrder } from 'typeorm';
import { BaseService, Result } from '../../../common';
import { DomainQuestionsAnswers } from '../../../common/modules/persistence/entities';
import {
  DomainQuestionsAnswersRepository,
  FindAllResponse,
} from '../../../common/modules/persistence/repositories';

@Injectable()
export class DomainQuestionsAnswersService extends BaseService<
  DomainQuestionsAnswers,
  DomainQuestionsAnswersRepository
> {
  constructor(protected readonly repository: DomainQuestionsAnswersRepository) {
    super(repository);
  }

  async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<DomainQuestionsAnswers>,
    searchField?: Array<keyof DomainQuestionsAnswers>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<DomainQuestionsAnswers>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder(
      'domainQuestionsAnswers',
    );

    // Condición para excluir registros eliminados
    queryBuilder.where('domainQuestionsAnswers.deletedAt IS NULL');

    // Agregar condición de filtro si existe
    if (filter) {
      queryBuilder.andWhere(
        'domainQuestionsAnswers.domainKnowledgeId = :filter OR domainQuestionsAnswers.domainKnowledgeLevelId = :filter',
        { filter },
      );
    }

    // Agregar condiciones de búsqueda si existen
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(domainQuestionsAnswers.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(domainQuestionsAnswers.${field as string}, :searchTerm) > 0.2)`;

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
          `domainQuestionsAnswers.${key}`,
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
        'domainQuestionsAnswers.domainKnowledge',
        'domainKnowledge',
      )
      .leftJoinAndSelect('domainKnowledge.technologyItem', 'technologyItem')
      .leftJoinAndSelect('technologyItem.technologyType', 'technologyType')
      .leftJoinAndSelect(
        'domainQuestionsAnswers.domainKnowledgeLevel',
        'domainKnowledgeLevel',
      )
      .leftJoinAndSelect('domainKnowledgeLevel.level', 'level')
      .leftJoinAndSelect(
        'domainKnowledgeLevel.domainKnowledge',
        'dkl_domainKnowledge',
      )
      .leftJoinAndSelect(
        'dkl_domainKnowledge.technologyItem',
        'dkl_technologyItem',
      )
      .leftJoinAndSelect(
        'dkl_technologyItem.technologyType',
        'dkl_technologyType',
      );

    // Selección de campos específicos
    queryBuilder.select([
      'domainQuestionsAnswers.domainQuestionAnswerId',
      'domainQuestionsAnswers.domainKnowledgeId',
      'domainQuestionsAnswers.domainKnowledgeLevelId',
      'domainQuestionsAnswers.question',
      'domainQuestionsAnswers.answer',
      'domainQuestionsAnswers.status',
      'domainQuestionsAnswers.createdAt',
      'domainQuestionsAnswers.updatedAt',
      'domainQuestionsAnswers.deletedAt',
      'technologyItem.technologyItemId',
      'technologyType.technologyTypeId',
      'domainKnowledge.domainKnowledgeId',
      'domainKnowledge.domain',
      'domainKnowledgeLevel.domainKnowledgeLevelId',
      'level.levelId',
      'level.name',
      'dkl_domainKnowledge.domainKnowledgeId',
      'dkl_domainKnowledge.domain',
      'dkl_technologyItem.technologyItemId',
      'dkl_technologyType.technologyTypeId',
    ]);

    // Ejecutar la consulta
    const [result, total] = await queryBuilder.getManyAndCount();

    // Procesar los resultados para obtener el dominio correcto
    const processedResult = result.map((item) => ({
      ...item,
      domain:
        item.domainKnowledge?.domain ||
        item.domainKnowledgeLevel?.domainKnowledge?.domain,
    }));

    return Result.ok({
      data: processedResult,
      total,
    });
  }
}
