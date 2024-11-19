import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '@repositories/find-all.response';
import KnowledgeGapsRepository from '@repositories/knowledge-gaps/knowledge-gaps.repository';
import { Brackets, FindOptionsOrder, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class KnowledgeGapsService extends BaseService<
  KnowledgeGaps,
  KnowledgeGapsRepository
> {
  constructor(protected readonly repository: KnowledgeGapsRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<KnowledgeGaps>,
    searchField?: Array<keyof KnowledgeGaps> | Array<string>,
    searchTerm?: string,
    filter?: string,
    withDisabled?: boolean,
  ): Promise<Result<FindAllResponse<KnowledgeGaps>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('knowledgeGaps');

    this.applyRelations(queryBuilder);
    this.applyDefaultFilters(queryBuilder, withDisabled);
    this.applyFilters(queryBuilder, filter, withDisabled);
    this.applySearch(queryBuilder, searchField, searchTerm);
    this.applyOrder(queryBuilder, order);
    this.applyPagination(queryBuilder, page, size);

    const [result, total] = await queryBuilder.getManyAndCount();
    return Result.ok({ data: result, total });
  }

  private applyRelations(
    queryBuilder: SelectQueryBuilder<KnowledgeGaps>,
  ): void {
    queryBuilder
      .leftJoinAndSelect('knowledgeGaps.assessment', 'assessment')
      .leftJoinAndSelect(
        'assessment.rolePerProfessional',
        'rolePerProfessional',
      );
  }

  private applyDefaultFilters(
    queryBuilder: SelectQueryBuilder<KnowledgeGaps>,
    withDisabled?: boolean,
  ): void {
    queryBuilder.andWhere('knowledgeGaps.deletedAt IS NULL');
    // if (withDisabled === false) {
    //   queryBuilder.andWhere('knowledgeGaps.status != :withDisabled', {
    //     withDisabled,
    //   });
    // }
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<KnowledgeGaps>,
    filter?: string,
    withDisabled?: boolean,
  ): void {
    if (filter) {
      queryBuilder.andWhere('rolePerProfessional.professionalId = :filter', {
        filter,
      });
    }

    if (withDisabled === false) {
      queryBuilder
        .andWhere('assessment.status != :withDisabled', {
          withDisabled,
        })
        .andWhere('rolePerProfessional.status != :withDisabled', {
          withDisabled,
        });
    }
  }

  private applySearch(
    queryBuilder: SelectQueryBuilder<KnowledgeGaps>,
    searchField?: Array<keyof KnowledgeGaps> | Array<string>,
    searchTerm?: string,
  ): void {
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(knowledgeGaps.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(knowledgeGaps.${field as string}, :searchTerm) > 0.2)`;
            if (index === 0) {
              qb.where(condition, { searchTerm: `%${searchTerm}%` });
            } else {
              qb.orWhere(condition, { searchTerm: `%${searchTerm}%` });
            }
          });
        }),
      );
    }
  }

  private applyOrder(
    queryBuilder: SelectQueryBuilder<KnowledgeGaps>,
    order?: FindOptionsOrder<KnowledgeGaps>,
  ): void {
    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            queryBuilder.addOrderBy(
              `${key}.${subKey}`,
              subValue as 'ASC' | 'DESC',
            );
          });
        } else {
          queryBuilder.addOrderBy(
            `knowledgeGaps.${key}`,
            value as 'ASC' | 'DESC',
          );
        }
      });
    }
  }

  private applyPagination(
    queryBuilder: SelectQueryBuilder<KnowledgeGaps>,
    page?: number,
    size?: number,
  ): void {
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }
  }

  // override async findAll(
  //   page?: number,
  //   size?: number,
  //   order?: FindOptionsOrder<KnowledgeGaps> | undefined,
  //   searchField?: string[] | (keyof KnowledgeGaps)[] | undefined,
  //   searchTerm?: string,
  //   filter?: string,
  //   withDisabled?: boolean,
  // ): Promise<Result<FindAllResponse<KnowledgeGaps>>> {
  //   const repository = this.repository.repository;
  //   const queryBuilder = repository.createQueryBuilder('knowledgeGaps');

  //   // Condición para excluir registros eliminados
  //   queryBuilder.where('knowledgeGaps.deletedAt IS NULL');

  //   // Relaciones
  //   queryBuilder.leftJoinAndSelect('knowledgeGaps.assessment', 'assessment');
  //   queryBuilder.andWhere('assessment.deletedAt IS NULL');

  //   queryBuilder.leftJoinAndSelect(
  //     'assessment.rolePerProfessional',
  //     'rolePerProfessional',
  //   );
  //   queryBuilder.andWhere('rolePerProfessional.deletedAt IS NULL');

  //   // Quitar los registros desactivados
  //   if (withDisabled === false) {
  //     queryBuilder.andWhere('knowledgeGaps.status != :withDisabled', {
  //       withDisabled,
  //     });
  //     queryBuilder.andWhere('assessment.status != :withDisabled', {
  //       withDisabled,
  //     });
  //     queryBuilder.andWhere('rolePerProfessional.status != :withDisabled', {
  //       withDisabled,
  //     });
  //   }

  //   // Agregar condición de filtro si existe
  //   if (filter) {
  //     queryBuilder.andWhere('rolePerProfessional.professionalId = :filter', {
  //       filter,
  //     });
  //   }

  //   // Agregar condiciones de búsqueda si existen
  //   if (searchField && searchTerm) {
  //     queryBuilder.andWhere(
  //       new Brackets((qb) => {
  //         searchField.forEach((field, index) => {
  //           const condition = `(unaccent(${field}) ILIKE unaccent(:searchTerm) OR word_similarity(${field}, :searchTerm) > 0.2)`;

  //           if (index === 0) {
  //             qb.where(condition, { searchTerm: `%${searchTerm}%` });
  //           } else {
  //             qb.orWhere(condition, { searchTerm: `%${searchTerm}%` });
  //           }
  //         });
  //       }),
  //     );
  //   }

  //   // Ordenar resultados si se especifica
  //   if (order) {
  //     Object.entries(order).forEach(([key, value]) => {
  //       queryBuilder.addOrderBy(
  //         `knowledgeGaps.${key}`,
  //         value as 'ASC' | 'DESC',
  //       );
  //     });
  //   }

  //   // Paginación
  //   if (page !== undefined && size !== undefined) {
  //     queryBuilder.skip(page * size).take(size);
  //   }

  //   // Ejecutar la consulta
  //   const [result, total] = await queryBuilder.getManyAndCount();

  //   return Result.ok({
  //     data: result,
  //     total,
  //   });
  // }
}
