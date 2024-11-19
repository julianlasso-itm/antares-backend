import { Assessments } from '@entities/assessments/assessments.entity';
import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { KnowledgeGapNotes } from './knowledge-gap-notes.entity';

@Index(
  'knowledge_gaps_asmt_id_dk_id_Idx',
  ['assessmentId', 'domainKnowledgeId'],
  { unique: true },
)
@Index('knowledge_gaps_kg_status_Idx', ['status', 'deletedAt'], {})
@Index('pkkg_knowledge_gaps', ['knowledgeGapId'], { unique: true })
@Entity('kg_knowledge_gaps', {
  schema: 'knowledge_gaps',
  comment: 'Brechas de conocimiento detectadas en un assessment',
})
export class KnowledgeGaps {
  @Column('character varying', {
    primary: true,
    name: 'kg_id',
    length: 26,
    comment: 'Identificador de la brecha de conocimiento detectada',
  })
  knowledgeGapId: string;

  @Column('character varying', {
    name: 'asmt_id',
    length: 26,
    comment:
      'Identificador de la evaluación realizada a un profesional con un rol en un proyecto de un cliente',
  })
  assessmentId: string;

  @Column('character varying', {
    name: 'dk_id',
    length: 26,
    comment: 'Identificador del dominio de conocimiento',
  })
  domainKnowledgeId: string;

  @Column('character varying', {
    name: 'kg_title',
    length: 500,
    comment: 'Título de la brecha de conocimiento detectada',
  })
  title: string;

  @Column('character varying', {
    name: 'kg_observation',
    length: 8192,
    comment: 'Observaciones sobre la brecha de conocimiento detectada',
  })
  observation: string;

  @Column('boolean', {
    name: 'kg_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'kg_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'kg_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'kg_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => KnowledgeGapNotes,
    (knowledgeGapNotes) => knowledgeGapNotes.knowledgeGap,
  )
  knowledgeGapNotes: KnowledgeGapNotes[];

  @ManyToOne(() => Assessments, (assessments) => assessments.knowledgeGaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'asmt_id', referencedColumnName: 'assessmentId' }])
  assessment: Assessments;

  @ManyToOne(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.knowledgeGaps,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;
}
