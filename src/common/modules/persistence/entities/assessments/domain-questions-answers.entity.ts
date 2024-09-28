import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';
import { DomainKnowledge } from './domain-knowledge.entity';

@Index(
  'domain_questions_answers_dk_id_Idx',
  ['domainKnowledgeId', 'deletedAt'],
  {},
)
@Index(
  'domain_questions_answers_dk_lvl_id_Idx',
  ['domainKnowledgeLevelId', 'deletedAt'],
  {},
)
@Index('dqa_dqa_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_domain_questions_answers', ['domainQuestionAnswerId'], {
  unique: true,
})
@Entity('assmt_domain_questions_answers', { schema: 'assessments' })
export class DomainQuestionsAnswers {
  @Column('character varying', { primary: true, name: 'dqa_id', length: 26 })
  domainQuestionAnswerId: string;

  @Column('character varying', { name: 'dk_id', length: 26 })
  domainKnowledgeId: string;

  @Column('character varying', { name: 'dk_lvl_id', length: 26 })
  domainKnowledgeLevelId: string;

  @Column('character varying', { name: 'dqa_question', length: 500 })
  question: string;

  @Column('character varying', { name: 'dqa_answer', length: 8192 })
  answer: string;

  @Column('boolean', { name: 'dqa_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'dqa_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'dqa_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'dqa_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.assmtDomainQuestionsAnswers,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;

  @ManyToOne(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.domainQuestionsAnswers,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'dk_lvl_id', referencedColumnName: 'domainKnowledgeLevelId' },
  ])
  domainKnowledgeLevel: DomainKnowledgeLevels;
}
