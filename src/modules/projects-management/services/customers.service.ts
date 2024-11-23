import { BaseService } from '@common/services/service.abstract';
import Result from '@common/utils/result/result.util';
import { Customers } from '@entities/projects-management/customers.entity';
import { Injectable } from '@nestjs/common';
import CustomersRepository from '@repositories/projects-management/customers.repository';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CustomersService extends BaseService<
  Customers,
  CustomersRepository
> {
  constructor(protected readonly repository: CustomersRepository) {
    super(repository);
  }

  async getReport() {
    const queryBuilder =
      this.repository.repository.createQueryBuilder('customer');

    this.applyRelations(queryBuilder);
    this.applyConditions(queryBuilder);
    this.applyOrder(queryBuilder);

    const data = await queryBuilder.getMany();
    return Result.ok(data);
  }

  private applyRelations(queryBuilder: SelectQueryBuilder<Customers>): void {
    queryBuilder
      .leftJoinAndSelect('customer.projects', 'projects')
      .leftJoinAndSelect('projects.technologyStacks', 'technologyStacks')
      .leftJoinAndSelect(
        'technologyStacks.technologyPerRoles',
        'technologyPerRoles',
      )
      .leftJoinAndSelect('technologyPerRoles.role', 'role')
      .leftJoinAndSelect('role.rolePerProfessionals', 'rolePerProfessionals')
      .leftJoinAndSelect('rolePerProfessionals.professional', 'professional')
      .leftJoinAndSelect('rolePerProfessionals.assessments', 'assessments')
      .leftJoinAndSelect(
        'assessments.domainAssessmentScores',
        'domainAssessmentScores',
      )
      .leftJoinAndSelect(
        'domainAssessmentScores.configurationLevels',
        'configurationLevels',
      )
      .leftJoinAndSelect(
        'configurationLevels.configurationPerLevels',
        'configurationPerLevels',
      )
      .leftJoinAndSelect('configurationPerLevels.level', 'level')
      .leftJoinAndSelect('assessments.knowledgeGaps', 'knowledgeGaps')
      .leftJoinAndSelect('knowledgeGaps.knowledgeGapNotes', 'knowledgeGapNotes')
      .leftJoinAndSelect('technologyStacks.technologyItem', 'technologyItem')
      .leftJoinAndSelect('technologyItem.technologyType', 'technologyType');
  }

  private applyConditions(queryBuilder: SelectQueryBuilder<Customers>): void {
    queryBuilder.andWhere('customer.deletedAt IS NULL');
    queryBuilder.andWhere('projects.deletedAt IS NULL');
  }

  private applyOrder(queryBuilder: SelectQueryBuilder<Customers>): void {
    queryBuilder.addOrderBy('customer.customerId', 'ASC');
  }
}
