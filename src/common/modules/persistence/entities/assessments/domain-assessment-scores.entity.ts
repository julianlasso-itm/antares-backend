import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Assessments } from './assessments.entity';
import { ConfigurationLevels } from './configuration-levels.entity';
import { DomainKnowledge } from './domain-knowledge.entity';

@Index(
  'domain_assessment_scores_asmt_id_dk_id_cnf_lvl_id_Idx',
  ['assessmentId', 'configurationLevelId', 'deletedAt', 'domainKnowledgeId'],
  {},
)
@Index('domain_assessment_scores_das_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_domain_assessment_scores', ['domainAssessmentScoreId'], {
  unique: true,
})
@Entity('assmt_domain_assessment_scores', { schema: 'assessments' })
export class DomainAssessmentScores {
  @Column('character varying', { primary: true, name: 'das_id', length: 26 })
  domainAssessmentScoreId: string;

  @Column('character varying', { name: 'asmt_id', length: 26 })
  assessmentId: string;

  @Column('character varying', { name: 'dk_id', length: 26 })
  domainKnowledgeId: string;

  @Column('character varying', { name: 'cnf_lvl_id', length: 26 })
  configurationLevelId: string;

  @Column('character varying', {
    name: 'das_observations',
    nullable: true,
    length: 8192,
  })
  observations: string | null;

  @Column('numeric', { name: 'das_score', precision: 3, scale: 2 })
  score: number;

  @Column('boolean', { name: 'das_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'das_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'das_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'das_deleted_at',
    nullable: true,
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
    (domainKnowledge) => domainKnowledge.assmtDomainAssessmentScores,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;
}
