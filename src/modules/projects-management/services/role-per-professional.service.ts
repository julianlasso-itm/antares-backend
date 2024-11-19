import AntaresException from '@common/exceptions/antares.exception';
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

  async getAssessmentsByRolePerProfessional(
    rolePerProfessionalId: string,
    levelId?: string,
  ): Promise<Result<RolePerProfessional>> {
    const queryBuilder = this.repository.repository.createQueryBuilder(
      'rolePerProfessional',
    );

    queryBuilder.where('rolePerProfessional.deletedAt IS NULL');
    queryBuilder.andWhere('rolePerProfessional.status = true');
    queryBuilder.andWhere(
      'rolePerProfessional.rolePerProfessionalId = :rolePerProfessionalId',
      {
        rolePerProfessionalId,
      },
    );

    queryBuilder.andWhere('professional.deletedAt IS NULL');
    queryBuilder.andWhere('professional.status = true');
    queryBuilder.andWhere('role.deletedAt IS NULL');
    queryBuilder.andWhere('role.status = true');
    queryBuilder.andWhere('technologyPerRoles.deletedAt IS NULL');
    queryBuilder.andWhere('technologyPerRoles.status = true');
    queryBuilder.andWhere('technologyStack.deletedAt IS NULL');
    queryBuilder.andWhere('technologyStack.status = true');
    queryBuilder.andWhere('technologyItem.deletedAt IS NULL');
    queryBuilder.andWhere('technologyItem.status = true');
    queryBuilder.andWhere('technologyType.deletedAt IS NULL');
    queryBuilder.andWhere('technologyType.status = true');
    queryBuilder.andWhere('domainKnowledges.deletedAt IS NULL');
    queryBuilder.andWhere('domainKnowledges.status = true');

    if (levelId) {
      queryBuilder.andWhere('domainKnowledgeLevels.deletedAt IS NULL');
      queryBuilder.andWhere('domainKnowledgeLevels.status = true');
      queryBuilder.andWhere('domainKnowledgeLevels.levelId = :levelId', {
        levelId,
      });
      queryBuilder.andWhere('level.deletedAt IS NULL');
      queryBuilder.andWhere('level.status = true');
    }

    queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where('domainQuestionsAnswers.deletedAt IS NULL');
        // qb.andWhere('domainQuestionsAnswers.status = true');
      }),
    );

    queryBuilder.leftJoinAndSelect(
      'rolePerProfessional.professional',
      'professional',
    );
    queryBuilder.leftJoinAndSelect('rolePerProfessional.role', 'role');
    queryBuilder.leftJoinAndSelect(
      'role.technologyPerRoles',
      'technologyPerRoles',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyPerRoles.technologyStack',
      'technologyStack',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyStack.technologyItem',
      'technologyItem',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyItem.technologyType',
      'technologyType',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyItem.domainKnowledges',
      'domainKnowledges',
    );

    if (levelId) {
      queryBuilder.leftJoinAndSelect(
        'domainKnowledges.domainKnowledgeLevels',
        'domainKnowledgeLevels',
      );
      queryBuilder.leftJoinAndSelect('domainKnowledgeLevels.level', 'level');
      queryBuilder.leftJoinAndSelect(
        'domainKnowledgeLevels.domainQuestionsAnswers',
        'domainQuestionsAnswers',
        'domainQuestionsAnswers.status = true',
      );
    }

    if (!levelId) {
      queryBuilder.leftJoinAndSelect(
        'domainKnowledges.domainQuestionsAnswers',
        'domainQuestionsAnswers',
        'domainQuestionsAnswers.status = true',
      );
    }

    queryBuilder.addOrderBy('technologyType.technologyTypeId', 'ASC');
    queryBuilder.addOrderBy('technologyItem.name', 'ASC');
    queryBuilder.addOrderBy('domainKnowledges.weight', 'DESC');

    const data = await queryBuilder.getMany();
    if (data.length === 0) {
      const data = await this.getAssessmentsByAssessmentId(
        rolePerProfessionalId,
        levelId,
      );

      if (data.isErr) {
        return Result.err(data.error);
      }

      return Result.ok(data.value);
    }
    return Result.ok(data[0]);
  }

  async getAssessmentsByAssessmentId(
    assessmentId: string,
    levelId?: string,
  ): Promise<Result<RolePerProfessional>> {
    const queryBuilder = this.repository.repository.createQueryBuilder(
      'rolePerProfessional',
    );

    queryBuilder.where('rolePerProfessional.deletedAt IS NULL');
    queryBuilder.andWhere('rolePerProfessional.status = true');
    queryBuilder.andWhere('assessments.assessmentId = :assessmentId', {
      assessmentId,
    });
    queryBuilder.andWhere('assessments.deletedAt IS NULL');
    queryBuilder.andWhere('assessments.status = true');
    queryBuilder.andWhere('domainAssessmentScores.deletedAt IS NULL');
    queryBuilder.andWhere('domainAssessmentScores.status = true');

    queryBuilder.andWhere('professional.deletedAt IS NULL');
    queryBuilder.andWhere('professional.status = true');
    queryBuilder.andWhere('role.deletedAt IS NULL');
    queryBuilder.andWhere('role.status = true');
    queryBuilder.andWhere('technologyPerRoles.deletedAt IS NULL');
    queryBuilder.andWhere('technologyPerRoles.status = true');
    queryBuilder.andWhere('technologyStack.deletedAt IS NULL');
    queryBuilder.andWhere('technologyStack.status = true');
    queryBuilder.andWhere('technologyItem.deletedAt IS NULL');
    queryBuilder.andWhere('technologyItem.status = true');
    queryBuilder.andWhere('technologyType.deletedAt IS NULL');
    queryBuilder.andWhere('technologyType.status = true');
    queryBuilder.andWhere('domainKnowledges.deletedAt IS NULL');
    queryBuilder.andWhere('domainKnowledges.status = true');

    if (levelId) {
      queryBuilder.andWhere('domainKnowledgeLevels.deletedAt IS NULL');
      queryBuilder.andWhere('domainKnowledgeLevels.status = true');
      queryBuilder.andWhere('domainKnowledgeLevels.levelId = :levelId', {
        levelId,
      });
      queryBuilder.andWhere('level.deletedAt IS NULL');
      queryBuilder.andWhere('level.status = true');
    }

    queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where('domainQuestionsAnswers.deletedAt IS NULL');
        // qb.andWhere('domainQuestionsAnswers.status = true');
      }),
    );

    queryBuilder.leftJoinAndSelect(
      'rolePerProfessional.assessments',
      'assessments',
    );
    queryBuilder.leftJoinAndSelect(
      'assessments.domainAssessmentScores',
      'domainAssessmentScores',
    );
    queryBuilder.leftJoinAndSelect(
      'rolePerProfessional.professional',
      'professional',
    );
    queryBuilder.leftJoinAndSelect('rolePerProfessional.role', 'role');
    queryBuilder.leftJoinAndSelect(
      'role.technologyPerRoles',
      'technologyPerRoles',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyPerRoles.technologyStack',
      'technologyStack',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyStack.technologyItem',
      'technologyItem',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyItem.technologyType',
      'technologyType',
    );
    queryBuilder.leftJoinAndSelect(
      'technologyItem.domainKnowledges',
      'domainKnowledges',
    );

    if (levelId) {
      queryBuilder.leftJoinAndSelect(
        'domainKnowledges.domainKnowledgeLevels',
        'domainKnowledgeLevels',
      );
      queryBuilder.leftJoinAndSelect('domainKnowledgeLevels.level', 'level');
      queryBuilder.leftJoinAndSelect(
        'domainKnowledgeLevels.domainQuestionsAnswers',
        'domainQuestionsAnswers',
        'domainQuestionsAnswers.status = true',
      );
    }

    if (!levelId) {
      queryBuilder.leftJoinAndSelect(
        'domainKnowledges.domainQuestionsAnswers',
        'domainQuestionsAnswers',
        'domainQuestionsAnswers.status = true',
      );
    }

    queryBuilder.addOrderBy('technologyType.technologyTypeId', 'ASC');
    queryBuilder.addOrderBy('technologyItem.name', 'ASC');
    queryBuilder.addOrderBy('domainKnowledges.weight', 'DESC');

    const data = await queryBuilder.getMany();
    if (data.length === 0) {
      return Result.err(new AntaresException('No configuration found'));
    }
    return Result.ok(data[0]);
  }
}
