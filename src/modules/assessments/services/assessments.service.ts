// import { BaseService } from '@common/services/service.abstract';
// import Result from '@common/utils/result/result.util';
// import { Assessments } from '@entities/assessments/assessments.entity';
// import { Injectable } from '@nestjs/common';
// import AssessmentsRepository from '@repositories/assessments/assessments.repository';
// import { FindAllResponse } from '@repositories/find-all.response';
// import { Brackets, FindOptionsOrder } from 'typeorm';

// @Injectable()
// export class AssessmentsService extends BaseService<
//   Assessments,
//   AssessmentsRepository
// > {
//   constructor(protected readonly repository: AssessmentsRepository) {
//     super(repository);
//   }

//   override async findAll(
//     page?: number,
//     size?: number,
//     order?: FindOptionsOrder<Assessments>,
//     searchField?: Array<keyof Assessments>,
//     searchTerm?: string,
//     filter?: string,
//   ): Promise<Result<FindAllResponse<Assessments>>> {
//     console.log('filter - AssessmentsService.findAll', filter);
//     const repository = this.repository.repository;
//     const queryBuilder = repository.createQueryBuilder('assessment');

//     // Condición para excluir registros eliminados
//     queryBuilder.where('assessment.deletedAt IS NULL');

//     // Agregar condición de filtro si existe
//     if (filter) {
//       queryBuilder.andWhere('assessment.rolePerProfessionalId = :filter', {
//         filter,
//       });
//       queryBuilder.orWhere('assessment.userId = :filter', { filter });
//     }

//     // Agregar condiciones de búsqueda si existen
//     if (searchField && searchTerm) {
//       queryBuilder.andWhere(
//         new Brackets((qb) => {
//           searchField.forEach((field, index) => {
//             const condition = `(unaccent(assessment.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(assessment.${field as string}, :searchTerm) > 0.2)`;

//             if (index === 0) {
//               qb.where(condition, { searchTerm: `%${searchTerm}%` });
//             } else {
//               qb.orWhere(condition, { searchTerm: `%${searchTerm}%` });
//             }
//           });
//         }),
//       );
//     }

//     // Ordenar resultados si se especifica
//     if (order) {
//       Object.entries(order).forEach(([key, value]) => {
//         if (typeof value === 'object') {
//           // Ordenar por el campo anidado
//           Object.entries(value).forEach(([subKey, subValue]) => {
//             queryBuilder.addOrderBy(
//               `${key}.${subKey}`,
//               subValue as 'ASC' | 'DESC',
//             );
//           });
//         } else {
//           // Ordenar por los campos simples de assessment
//           queryBuilder.addOrderBy(`assessment.${key}`, value as 'ASC' | 'DESC');
//         }
//       });
//     }

//     // Paginación
//     if (page !== undefined && size !== undefined) {
//       queryBuilder.skip(page * size).take(size);
//     }

//     // Relaciones
//     queryBuilder.leftJoinAndSelect(
//       'assessment.rolePerProfessional',
//       'rolePerProfessional',
//     );
//     queryBuilder.leftJoinAndSelect(
//       'rolePerProfessional.professional',
//       'professional',
//     );
//     queryBuilder.leftJoinAndSelect('rolePerProfessional.role', 'role');

//     // Ejecutar la consulta
//     const [result, total] = await queryBuilder.getManyAndCount();

//     return Result.ok({
//       data: result,
//       total,
//     });
//   }
// }

import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { Assessments } from '@entities/assessments/assessments.entity';
import { Injectable } from '@nestjs/common';
import AssessmentsRepository from '@repositories/assessments/assessments.repository';
import { FindAllResponse } from '@repositories/find-all.response';
import { Brackets, FindOptionsOrder, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class AssessmentsService extends BaseService<
  Assessments,
  AssessmentsRepository
> {
  constructor(protected readonly repository: AssessmentsRepository) {
    super(repository);
  }

  override async findAll(
    page?: number,
    size?: number,
    order?: FindOptionsOrder<Assessments>,
    searchField?: Array<keyof Assessments>,
    searchTerm?: string,
    filter?: string,
  ): Promise<Result<FindAllResponse<Assessments>>> {
    console.log('filter - AssessmentsService.findAll', filter);
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('assessment');

    this.applyDefaultFilters(queryBuilder);
    this.applyFilter(queryBuilder, filter);
    this.applySearchConditions(queryBuilder, searchField, searchTerm);
    this.applyOrdering(queryBuilder, order);
    this.applyPagination(queryBuilder, page, size);
    this.applyRelations(queryBuilder);

    const [result, total] = await queryBuilder.getManyAndCount();
    return Result.ok({ data: result, total });
  }

  async getProfessionalCompletedAssessments(
    professionalId: string,
  ): Promise<Result<FindAllResponse<Assessments>>> {
    const repository = this.repository.repository;
    const queryBuilder = repository.createQueryBuilder('assessment');

    this.applyDefaultFilters(queryBuilder);
    this.applyFilterForProfessional(queryBuilder, professionalId);
    this.applyOrdering(queryBuilder, {
      endDate: 'DESC',
    });
    this.applyRelations(queryBuilder);

    const [result, total] = await queryBuilder.getManyAndCount();
    return Result.ok({ data: result, total });
  }

  private applyDefaultFilters(queryBuilder: any) {
    queryBuilder.where('assessment.deletedAt IS NULL');
  }

  private applyFilter(
    queryBuilder: SelectQueryBuilder<Assessments>,
    filter?: string,
  ) {
    if (filter) {
      queryBuilder.andWhere('assessment.rolePerProfessionalId = :filter', {
        filter,
      });
      queryBuilder.orWhere('assessment.userId = :filter', { filter });
    }
  }

  private applyFilterForProfessional(
    queryBuilder: SelectQueryBuilder<Assessments>,
    professionalId: string,
  ) {
    queryBuilder.andWhere(
      'rolePerProfessional.professionalId = :professionalId',
      {
        professionalId,
      },
    );
    queryBuilder.andWhere('assessment.endDate IS NOT NULL');
    queryBuilder.andWhere('assessment.status = true');
    queryBuilder.andWhere('rolePerProfessional.deletedAt IS NULL');
    queryBuilder.andWhere('rolePerProfessional.status = true');
    queryBuilder.andWhere('professional.deletedAt IS NULL');
    queryBuilder.andWhere('professional.status = true');
    queryBuilder.andWhere('role.deletedAt IS NULL');
    queryBuilder.andWhere('role.status = true');
  }

  private applySearchConditions(
    queryBuilder: SelectQueryBuilder<Assessments>,
    searchField?: Array<keyof Assessments>,
    searchTerm?: string,
  ) {
    if (searchField && searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchField.forEach((field, index) => {
            const condition = `(unaccent(assessment.${field as string}) ILIKE unaccent(:searchTerm) OR word_similarity(assessment.${field as string}, :searchTerm) > 0.2)`;
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

  private applyOrdering(
    queryBuilder: SelectQueryBuilder<Assessments>,
    order?: FindOptionsOrder<Assessments>,
  ) {
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
          queryBuilder.addOrderBy(`assessment.${key}`, value as 'ASC' | 'DESC');
        }
      });
    }
  }

  private applyPagination(
    queryBuilder: SelectQueryBuilder<Assessments>,
    page?: number,
    size?: number,
  ) {
    if (page !== undefined && size !== undefined) {
      queryBuilder.skip(page * size).take(size);
    }
  }

  private applyRelations(queryBuilder: SelectQueryBuilder<Assessments>) {
    queryBuilder.leftJoinAndSelect(
      'assessment.rolePerProfessional',
      'rolePerProfessional',
    );
    queryBuilder.leftJoinAndSelect(
      'rolePerProfessional.professional',
      'professional',
    );
    queryBuilder.leftJoinAndSelect('rolePerProfessional.role', 'role');
  }
}
