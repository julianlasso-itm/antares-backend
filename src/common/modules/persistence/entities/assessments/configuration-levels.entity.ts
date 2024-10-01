import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ConfigurationPerLevel } from './configuration-per-level.entity';
import { DomainAssessmentScores } from './domain-assessment-scores.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';
import { RatingScale } from './rating-scale.entity';

@Index('configuration_level_cnf_lvl_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_configuration_levels', ['configurationLevelId'], {
  unique: true,
})
@Entity('assmt_configuration_levels', {
  schema: 'assessments',
  comment:
    'Configuración para los niveles del sistema. Ejemplo Junior, Middle y Senior',
})
export class ConfigurationLevels {
  @Column('character varying', {
    primary: true,
    name: 'cnf_lvl_id',
    length: 26,
    comment: 'Identificador de la configuración',
  })
  configurationLevelId: string;

  @Column('character varying', {
    name: 'cnf_lvl_name',
    length: 50,
    comment: 'Nombre de la configuración',
  })
  name: string;

  @Column('boolean', {
    name: 'cnf_lvl_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'cnf_lvl_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cnf_lvl_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cnf_lvl_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
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
