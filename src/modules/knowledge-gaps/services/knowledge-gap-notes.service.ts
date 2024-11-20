import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '@repositories/find-all.response';
import KnowledgeGapNotesRepository from '@repositories/knowledge-gaps/knowledge-gap-notes.repository';
import { Brackets, FindOptionsOrder, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class KnowledgeGapNotesService extends BaseService<
  KnowledgeGapNotes,
  KnowledgeGapNotesRepository
> {
  constructor(protected readonly repository: KnowledgeGapNotesRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<KnowledgeGapNotes>,
    searchField?: Array<keyof KnowledgeGapNotes> | Array<string>,
    searchTerm?: string,
    filter?: string,
    withDisabled?: boolean,
  ): Promise<Result<FindAllResponse<KnowledgeGapNotes>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('knowledgeGapNotes');

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
    queryBuilder: SelectQueryBuilder<KnowledgeGapNotes>,
  ): void {
    queryBuilder.leftJoinAndSelect(
      'knowledgeGapNotes.knowledgeGap',
      'knowledgeGap',
    );
  }

  private applyDefaultFilters(
    queryBuilder: SelectQueryBuilder<KnowledgeGapNotes>,
    withDisabled?: boolean,
  ): void {
    queryBuilder.andWhere('knowledgeGapNotes.deletedAt IS NULL');
    if (withDisabled === false) {
      queryBuilder.andWhere('knowledgeGapNotes.status != :withDisabled', {
        withDisabled,
      });
    }
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<KnowledgeGapNotes>,
    filter?: string,
    withDisabled?: boolean,
  ): void {
    if (filter) {
      queryBuilder.andWhere('knowledgeGap.knowledgeGapId = :filter', {
        filter,
      });
      queryBuilder.andWhere('knowledgeGap.deletedAt IS NULL');
    }

    if (withDisabled === false) {
      queryBuilder.andWhere('knowledgeGap.status != :withDisabled', {
        withDisabled,
      });
    }
  }

  private applySearch(
    queryBuilder: SelectQueryBuilder<KnowledgeGapNotes>,
    searchField?: Array<keyof KnowledgeGapNotes> | Array<string>,
    searchTerm?: string,
  ): void {
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(knowledgeGapNotes.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(knowledgeGapNotes.${field as string}, :searchTerm) > 0.2)`;
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
    queryBuilder: SelectQueryBuilder<KnowledgeGapNotes>,
    order?: FindOptionsOrder<KnowledgeGapNotes>,
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
            `knowledgeGapNotes.${key}`,
            value as 'ASC' | 'DESC',
          );
        }
      });
    }
  }

  private applyPagination(
    queryBuilder: SelectQueryBuilder<KnowledgeGapNotes>,
    page?: number,
    size?: number,
  ): void {
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }
  }
}
