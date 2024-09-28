import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { KnowledgeGaps } from '../knowledge_gaps';
import { TechnologyItems } from '../technologies';
import { DomainAssessmentScores } from './domain-assessment-scores.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';
import { DomainQuestionsAnswers } from './domain-questions-answers.entity';

@Index('domain knowledge_dk_status_Idx', ['deletedAt', 'status'], {})
@Index(
  'domain knowledge_tech_item_id_Idx',
  ['deletedAt', 'technologyItemId'],
  {},
)
@Index('pkassmt_domain_knowledge', ['domainKnowledgeId'], { unique: true })
@Entity('assmt_domain_knowledge', { schema: 'assessments' })
export class DomainKnowledge {
  @Column('character varying', { primary: true, name: 'dk_id', length: 26 })
  domainKnowledgeId: string;

  @Column('character varying', { name: 'tech_item_id', length: 26 })
  technologyItemId: string;

  @Column('character varying', { name: 'dk_domain', length: 500 })
  domain: string;

  @Column('numeric', {
    name: 'dk_weight',
    nullable: true,
    precision: 3,
    scale: 2,
  })
  weight: string | null;

  @Column('character varying', { name: 'dk_topic', length: 1024 })
  topic: string;

  @Column('boolean', { name: 'dk_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'dk_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'dk_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'dk_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => DomainAssessmentScores,
    (assmtDomainAssessmentScores) =>
      assmtDomainAssessmentScores.domainKnowledge,
  )
  assmtDomainAssessmentScores: DomainAssessmentScores[];

  @ManyToOne(
    () => TechnologyItems,
    (techTechnologyItems) => techTechnologyItems.domainKnowledges,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'tech_item_id', referencedColumnName: 'technologyItemId' },
  ])
  techItem: TechnologyItems;

  @OneToMany(
    () => DomainKnowledgeLevels,
    (assmtDomainKnowledgeLevels) => assmtDomainKnowledgeLevels.domainKnowledge,
  )
  assmtDomainKnowledgeLevels: DomainKnowledgeLevels[];

  @OneToMany(
    () => DomainQuestionsAnswers,
    (assmtDomainQuestionsAnswers) =>
      assmtDomainQuestionsAnswers.domainKnowledge,
  )
  assmtDomainQuestionsAnswers: DomainQuestionsAnswers[];

  @OneToMany(
    () => KnowledgeGaps,
    (kgKnowledgeGaps) => kgKnowledgeGaps.domainKnowledge,
  )
  kgKnowledgeGaps: KnowledgeGaps[];
}
