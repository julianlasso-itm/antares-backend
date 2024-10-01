import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from '../security';
import { KnowledgeGaps } from './knowledge-gaps.entity';

@Index(
  'knowledge_gap_notes_user_id_kg_id_Idx',
  ['knowledgeGapId', 'userId', 'deletedAt'],
  {},
)
@Index('knowledge_gap_notes_kgn_status_Idx', ['status', 'deletedAt'], {})
@Index('pkkg_knowledge_gap_notes', ['knowledgeGapNoteId'], { unique: true })
@Entity('kg_knowledge_gap_notes', {
  schema: 'knowledge_gaps',
  comment: 'Notas sobre una brecha de conocimiento detectada en un assessment',
})
export class KnowledgeGapNotes {
  @ApiProperty({
    description:
      'Identificador de la nota sobre la brecha de conocimiento detectada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'kgn_id',
    length: 26,
    comment:
      'Identificador de la nota sobre la brecha de conocimiento detectada',
  })
  knowledgeGapNoteId: string;

  @ApiProperty({
    description: 'Identificador del usuario en el sistema que realizó la nota',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'user_id',
    length: 26,
    comment: 'Identificador del usuario en el sistema que realizó la nota',
  })
  userId: string;

  @ApiProperty({
    description: 'Identificador de la brecha de conocimiento detectada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'kg_id',
    length: 26,
    comment: 'Identificador de la brecha de conocimiento detectada',
  })
  knowledgeGapId: string;

  @ApiProperty({
    description: 'Observaciones sobre la brecha de conocimiento detectada',
    example:
      'Posee los conocimientos teóricos necesarios, pero aún falla en la práctica.',
    required: true,
    maxLength: 8192,
    type: String,
  })
  @Column('character varying', {
    name: 'kgn_observation',
    length: 8192,
    comment: 'Observaciones sobre la brecha de conocimiento detectada',
  })
  observation: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'kgn_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @ApiProperty({
    description: 'Fecha y hora de creación del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'kgn_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de última actualización del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'kgn_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'Fecha y hora de borrado del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'kgn_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
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
