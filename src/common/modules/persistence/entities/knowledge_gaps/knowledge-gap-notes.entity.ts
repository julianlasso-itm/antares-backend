import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from '../security';
import { KnowledgeGaps } from './knowledge-gaps.entity';

@Index(
  'knowledge_gap_notes_user_id_kg_id_Idx',
  ['knowledgeGapId', 'deletedAt', 'userId'],
  {},
)
@Index('knowledge_gap_notes_kgn_status_Idx', ['deletedAt', 'status'], {})
@Index('pkkg_knowledge_gap_notes', ['knowledgeGapNoteId'], { unique: true })
@Entity('kg_knowledge_gap_notes', { schema: 'knowledge_gaps' })
export class KnowledgeGapNotes {
  @Column('character varying', { primary: true, name: 'kgn_id', length: 26 })
  knowledgeGapNoteId: string;

  @Column('character varying', { name: 'user_id', length: 26 })
  userId: string;

  @Column('character varying', { name: 'kg_id', length: 26 })
  knowledgeGapId: string;

  @Column('character varying', { name: 'kgn_observation', length: 8192 })
  observation: string;

  @Column('boolean', { name: 'kgn_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'kgn_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'kgn_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'kgn_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => KnowledgeGaps,
    (knowledgeGaps) => knowledgeGaps.knowledgeGapNotes,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'kg_id', referencedColumnName: 'knowledgeGapId' }])
  knowledgeGap: KnowledgeGaps;

  @ManyToOne(() => Users, (users) => users.knowledgeGapNotes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;
}
