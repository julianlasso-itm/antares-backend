import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Assessments } from './assessments.entity';
import { ConfigurationLevels } from './configuration-levels.entity';
import { DomainKnowledge } from './domain-knowledge.entity';

@Index(
  'domain_assessment_scores_asmt_id_dk_id_cnf_lvl_id_Idx',
  ['assessmentId', 'configurationLevelId', 'deletedAt', 'domainKnowledgeId'],
  {},
)
@Index('domain_assessment_scores_das_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_domain_assessment_scores', ['domainAssessmentScoreId'], {
  unique: true,
})
@Entity('assmt_domain_assessment_scores', {
  schema: 'assessments',
  comment:
    'Puntaje del dominio de conocimiento de una tecnología en un assessment de un profesional con un rol específico en un proyecto de un cliente',
})
export class DomainAssessmentScores {
  @Column('character varying', {
    primary: true,
    name: 'das_id',
    length: 26,
    comment: 'Identificador del puntaje del dominio de conocimiento',
  })
  domainAssessmentScoreId: string;

  @Column('character varying', {
    name: 'asmt_id',
    length: 26,
    comment: 'Identificador del assessment',
  })
  assessmentId: string;

  @Column('character varying', {
    name: 'dk_id',
    length: 26,
    comment: 'Identificador del dominio de conocimiento',
  })
  domainKnowledgeId: string;

  @Column('character varying', {
    name: 'cnf_lvl_id',
    length: 26,
    comment: 'Identificador de la configuración usada',
  })
  configurationLevelId: string;

  @Column('character varying', {
    name: 'das_observations',
    nullable: true,
    length: 8192,
    comment:
      'Observaciones del evaluador sobre el dominio de conocimiento en relación al profesional evaluado',
  })
  observations: string | null;

  @Column('numeric', {
    name: 'das_score',
    precision: 3,
    scale: 2,
    comment:
      'Puntaje del dominio del conocimiento al ser evaluado. Ejemplo: 0.00, 1.00, 2.00... hasta 5.00',
  })
  score: number;

  @Column('numeric', {
    name: 'das_rating',
    precision: 23,
    scale: 20,
    comment:
      'Calificación del dominio, es decir, es el resultado ya calculado de su puntaje y su peso',
    default: () => 0.0,
  })
  rating: number;

  @Column('boolean', {
    name: 'das_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'das_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'das_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'das_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => Assessments,
    (assessment) => assessment.domainAssessmentScores,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'asmt_id', referencedColumnName: 'assessmentId' }])
  assessment: Assessments;

  @ManyToOne(
    () => ConfigurationLevels,
    (configurationLevels) => configurationLevels.domainAssessmentScores,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'cnf_lvl_id', referencedColumnName: 'configurationLevelId' },
  ])
  configurationLevels: ConfigurationLevels;

  @ManyToOne(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.domainAssessmentScores,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;
}
