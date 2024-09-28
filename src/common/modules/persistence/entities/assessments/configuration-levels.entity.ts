import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ConfigurationPerLevel } from './configuration-per-level.entity';
import { DomainAssessmentScores } from './domain-assessment-scores.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';
import { RatingScale } from './rating-scale.entity';

@Index('configuration_level_cnf_lvl_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_configuration_levels', ['configurationLevelId'], {
  unique: true,
})
@Entity('assmt_configuration_levels', { schema: 'assessments' })
export class ConfigurationLevels {
  @Column('character varying', {
    primary: true,
    name: 'cnf_lvl_id',
    length: 26,
  })
  configurationLevelId: string;

  @Column('character varying', { name: 'cnf_lvl_name', length: 50 })
  name: string;

  @Column('boolean', { name: 'cnf_lvl_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'cnf_lvl_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cnf_lvl_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cnf_lvl_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => ConfigurationPerLevel,
    (configurationPerLevel) => configurationPerLevel.configurationLevel,
  )
  configurationPerLevels: ConfigurationPerLevel[];

  @OneToMany(
    () => DomainAssessmentScores,
    (domainAssessmentScores) => domainAssessmentScores.configurationLevels,
  )
  domainAssessmentScores: DomainAssessmentScores[];

  @OneToMany(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.configurationLevel,
  )
  domainKnowledgeLevels: DomainKnowledgeLevels[];

  @OneToMany(() => RatingScale, (ratingScale) => ratingScale.configurationLevel)
  ratingScales: RatingScale[];
}
