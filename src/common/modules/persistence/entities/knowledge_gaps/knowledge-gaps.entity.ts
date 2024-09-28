import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Assessments, DomainKnowledge } from '../assessments';
import { KnowledgeGapNotes } from './knowledge-gap-notes.entity';

@Index(
  'knowledge_gaps_asmt_id_dk_id_Idx',
  ['assessmentId', 'domainKnowledgeId'],
  { unique: true },
)
@Index('knowledge_gaps_kg_status_Idx', ['deletedAt', 'status'], {})
@Index('pkkg_knowledge_gaps', ['knowledgeGapId'], { unique: true })
@Entity('kg_knowledge_gaps', { schema: 'knowledge_gaps' })
export class KnowledgeGaps {
  @Column('character varying', { primary: true, name: 'kg_id', length: 26 })
  knowledgeGapId: string;

  @Column('character varying', { name: 'asmt_id', length: 26 })
  assessmentId: string;

  @Column('character varying', { name: 'dk_id', length: 26 })
  domainKnowledgeId: string;

  @Column('boolean', { name: 'kg_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'kg_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'kg_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'kg_deleted_at',
    nullable: true,
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
    (domainKnowledge) => domainKnowledge.kgKnowledgeGaps,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;
}
