import { KnowledgeGaps } from '@entities/knowledge-gaps/knowledge-gaps.entity';
import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DomainAssessmentScores } from './domain-assessment-scores.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';
import { DomainQuestionsAnswers } from './domain-questions-answers.entity';

@Index('domain knowledge_dk_status_Idx', ['status', 'deletedAt'], {})
@Index(
  'domain knowledge_tech_item_id_Idx',
  ['technologyItemId', 'deletedAt'],
  {},
)
@Index('pkassmt_domain_knowledge', ['domainKnowledgeId'], { unique: true })
@Entity('assmt_domain_knowledge', {
  schema: 'assessments',
  comment: 'Dominios de conocimiento por cada tecnología',
})
export class DomainKnowledge {
  @Column('character varying', {
    primary: true,
    name: 'dk_id',
    length: 26,
    comment: 'Identificador del dominio de conocimiento',
  })
  domainKnowledgeId: string;

  @Column('character varying', {
    name: 'tech_item_id',
    length: 26,
    comment: 'Identificador de la tecnología',
  })
  technologyItemId: string;

  @Column('character varying', {
    name: 'dk_domain',
    length: 500,
    comment:
      'Nombre descriptivo del dominio de conocimiento. Ejemplo: Programación Reactiva, Programación Asíncrona, entre otros',
  })
  domain: string;

  @Column('numeric', {
    name: 'dk_weight',
    nullable: true,
    precision: 3,
    scale: 2,
    comment:
      'Peso (importancia) del dominio del conocimiento; puede ir de 0.00 a 1.00',
  })
  weight: number | null;

  @Column('character varying', {
    name: 'dk_topic',
    length: 1024,
    comment: 'Comentario para guiar al experto en lo que evaluará',
  })
  topic: string;

  @Column('boolean', {
    name: 'dk_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'dk_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'dk_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'dk_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => DomainAssessmentScores,
    (domainAssessmentScores) => domainAssessmentScores.domainKnowledge,
  )
  domainAssessmentScores: DomainAssessmentScores[];

  @ManyToOne(
    () => TechnologyItems,
    (technologyItems) => technologyItems.domainKnowledges,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'tech_item_id', referencedColumnName: 'technologyItemId' },
  ])
  technologyItem: TechnologyItems;

  @OneToMany(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.domainKnowledge,
    { cascade: true },
  )
  domainKnowledgeLevels: DomainKnowledgeLevels[];

  @OneToMany(
    () => DomainQuestionsAnswers,
    (domainQuestionsAnswers) => domainQuestionsAnswers.domainKnowledge,
    { cascade: true },
  )
  domainQuestionsAnswers: DomainQuestionsAnswers[];

  @OneToMany(
    () => KnowledgeGaps,
    (knowledgeGaps) => knowledgeGaps.domainKnowledge,
    { cascade: true },
  )
  knowledgeGaps: KnowledgeGaps[];
}
