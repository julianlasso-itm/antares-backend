import { ApiProperty } from '@nestjs/swagger';
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
@Index('knowledge_gaps_kg_status_Idx', ['status', 'deletedAt'], {})
@Index('pkkg_knowledge_gaps', ['knowledgeGapId'], { unique: true })
@Entity('kg_knowledge_gaps', {
  schema: 'knowledge_gaps',
  comment: 'Brechas de conocimiento detectadas en un assessment',
})
export class KnowledgeGaps {
  @ApiProperty({
    description: 'Identificador de la brecha de conocimiento detectada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'kg_id',
    length: 26,
    comment: 'Identificador de la brecha de conocimiento detectada',
  })
  knowledgeGapId: string;

  @ApiProperty({
    description:
      'Identificador de la evaluación realizada a un profesional con un rol en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'asmt_id',
    length: 26,
    comment:
      'Identificador de la evaluación realizada a un profesional con un rol en un proyecto de un cliente',
  })
  assessmentId: string;

  @ApiProperty({
    description: 'Identificador del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'dk_id',
    length: 26,
    comment: 'Identificador del dominio de conocimiento',
  })
  domainKnowledgeId: string;

  @ApiProperty({
    description: 'Observaciones sobre la brecha de conocimiento detectada',
    example:
      'Posee los conocimientos teóricos necesarios, pero aún falla en la práctica.',
    required: true,
    maxLength: 8192,
    type: String,
  })
  @Column('character varying', {
    name: 'kg_observation',
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
    name: 'kg_status',
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
    name: 'kg_created_at',
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
    name: 'kg_updated_at',
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
