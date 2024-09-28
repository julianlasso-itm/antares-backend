import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user_db_postgres',
      password: 'my_secret_password_postgres',
      database: 'antares_db',
      entities: [
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
      ],
      logging: 'all',
    }),
    TypeOrmModule.forFeature([
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
    ]),
  ],
  controllers: [],
  providers: [
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
  ],
  exports: [
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
  ],
})
export class PersistenceModule {}
