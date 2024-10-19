import { Assessments } from '@entities/assessments/assessments.entity';
import { ConfigurationLevels } from '@entities/assessments/configuration-levels.entity';
import { ConfigurationPerLevel } from '@entities/assessments/configuration-per-level.entity';
import { DomainAssessmentScores } from '@entities/assessments/domain-assessment-scores.entity';
import { DomainKnowledgeLevels } from '@entities/assessments/domain-knowledge-levels.entity';
import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import { DomainQuestionsAnswers } from '@entities/assessments/domain-questions-answers.entity';
import { Levels } from '@entities/assessments/levels.entity';
import { RatingScale } from '@entities/assessments/rating-scale.entity';
import { Professionals } from '@entities/human-resources/professionals.entity';
import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { Customers } from '@entities/projects-management/customers.entity';
import { Projects } from '@entities/projects-management/projects.entity';
import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
import { RolesProjectManagement } from '@entities/projects-management/roles-projects-management.entity';
import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
import { TechnologyStack } from '@entities/projects-management/technology-stack.entity';
import { RolesSecurity } from '@entities/security/roles-security.entity';
import { UserPerRole } from '@entities/security/user-per-role.entity';
import { Users } from '@entities/security/users.entity';
import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import { TechnologyTypes } from '@entities/technologies/technology-types.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import AssessmentsRepository from '@repositories/assessments/assessments.repository';
import ConfigurationLevelsRepository from '@repositories/assessments/configuration-levels.repository';
import ConfigurationPerLevelRepository from '@repositories/assessments/configuration-per-level.repository';
import DomainAssessmentScoresRepository from '@repositories/assessments/domain-assessment-scores.repository';
import DomainKnowledgeLevelsRepository from '@repositories/assessments/domain-knowledge-levels.repository';
import DomainKnowledgeRepository from '@repositories/assessments/domain-knowledge.repository';
import DomainQuestionsAnswersRepository from '@repositories/assessments/domain-questions-answers.repository';
import { LevelsRepository } from '@repositories/assessments/levels.repository';
import RatingScaleRepository from '@repositories/assessments/rating-scale.repository';
import ProfessionalsRepository from '@repositories/human-resources/professionals.repository';
import KnowledgeGapNotesRepository from '@repositories/knowledge-gaps/knowledge-gap-notes.repository';
import KnowledgeGapsRepository from '@repositories/knowledge-gaps/knowledge-gaps.repository';
import CustomersRepository from '@repositories/projects-management/customers.repository';
import ProjectsRepository from '@repositories/projects-management/projects.repository';
import RolePerProfessionalRepository from '@repositories/projects-management/role-per-professional.repository';
import RolesProjectManagementRepository from '@repositories/projects-management/roles-project-management.repository';
import TechnologyPerRoleRepository from '@repositories/projects-management/technology-per-role.repository';
import TechnologyStackRepository from '@repositories/projects-management/technology-stack.repository';
import RolesSecurityRepository from '@repositories/security/roles-security.repository';
import UserPerRoleRepository from '@repositories/security/user-per-role.repository';
import UsersRepository from '@repositories/security/users.repository';
import TechnologyItemsRepository from '@repositories/technologies/technology-items.repository';
import TechnologyTypesRepository from '@repositories/technologies/technology-types.repository';

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
  RolesProjectManagement,
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
