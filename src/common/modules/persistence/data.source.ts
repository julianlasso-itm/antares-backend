import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  Assessments,
  ConfigurationLevels,
  ConfigurationPerLevel,
  Customers,
  DomainAssessmentScores,
  DomainKnowledge,
  DomainKnowledgeLevels,
  DomainQuestionsAnswers,
  KnowledgeGapNotes,
  KnowledgeGaps,
  Levels,
  Professionals,
  Projects,
  RatingScale,
  RolePerProfessional,
  Roles as RolesProjectsManagement,
  TechnologyItems,
  TechnologyPerRole,
  TechnologyStack,
  TechnologyTypes,
} from './entities';
import {
  Roles as RolesSecurity,
  UserPerRole,
  Users,
} from './entities/security';
import {
  AssessmentsRepository,
  ConfigurationLevelsRepository,
  ConfigurationPerLevelRepository,
  CustomersRepository,
  DomainAssessmentScoresRepository,
  DomainKnowledgeLevelsRepository,
  DomainKnowledgeRepository,
  DomainQuestionsAnswersRepository,
  KnowledgeGapNotesRepository,
  KnowledgeGapsRepository,
  LevelsRepository,
  ProfessionalsRepository,
  ProjectsRepository,
  RatingScaleRepository,
  RolePerProfessionalRepository,
  RolesRepository as RolesProjectManagementRepository,
  TechnologyItemsRepository,
  TechnologyPerRoleRepository,
  TechnologyStackRepository,
  TechnologyTypesRepository,
} from './repositories';
import {
  RolesRepository as RolesSecurityRepository,
  UserPerRoleRepository,
  UsersRepository,
} from './repositories/security';

export const entities = [
  Assessments,
  ConfigurationLevels,
  ConfigurationPerLevel,
  Customers,
  DomainAssessmentScores,
  DomainKnowledge,
  DomainKnowledgeLevels,
  DomainQuestionsAnswers,
  KnowledgeGapNotes,
  KnowledgeGaps,
  Levels,
  Professionals,
  Projects,
  RatingScale,
  RolePerProfessional,
  RolesProjectsManagement,
  RolesSecurity,
  TechnologyItems,
  TechnologyPerRole,
  TechnologyStack,
  TechnologyTypes,
  UserPerRole,
  Users,
];

export const dataSource = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user_db_postgres',
  password: 'my_secret_password_postgres',
  database: 'antares_db',
  entities: entities,
  logging: 'all',
} as TypeOrmModuleOptions;

export const AppDataSource = new DataSource(dataSource as DataSourceOptions);

export const repositories = [
  AssessmentsRepository,
  ConfigurationLevelsRepository,
  ConfigurationPerLevelRepository,
  CustomersRepository,
  DomainAssessmentScoresRepository,
  DomainKnowledgeLevelsRepository,
  DomainKnowledgeRepository,
  DomainQuestionsAnswersRepository,
  KnowledgeGapNotesRepository,
  KnowledgeGapsRepository,
  LevelsRepository,
  ProfessionalsRepository,
  ProjectsRepository,
  RatingScaleRepository,
  RolePerProfessionalRepository,
  RolesProjectManagementRepository,
  RolesSecurityRepository,
  TechnologyItemsRepository,
  TechnologyPerRoleRepository,
  TechnologyStackRepository,
  TechnologyTypesRepository,
  UserPerRoleRepository,
  UsersRepository,
];