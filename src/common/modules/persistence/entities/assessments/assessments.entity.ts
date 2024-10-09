import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { KnowledgeGaps } from '../knowledge_gaps';
import { RolePerProfessional } from '../projects_management';
import { Users } from '../security';
import { DomainAssessmentScores } from './domain-assessment-scores.entity';

@Index('assessments_rpp_id_Idx', ['rolePerProfessionalId', 'deletedAt'], {})
@Index(
  'assessments_user_id_rpp_id_Idx',
  ['deletedAt', 'rolePerProfessionalId', 'userId'],
  {},
)
@Index('assessments_user_id_Idx', ['userId', 'deletedAt'], {})
@Index('assessments_asmt_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_assessments', ['assessmentId'], { unique: true })
@Entity('assmt_assessments', {
  schema: 'assessments',
  comment:
    'Evaluaciones realizadas a los profesionales bajo un rol en un proyecto específico',
})
export class Assessments {
  @ApiProperty({
    description:
      'Identificador de la evaluación realizada a un profesional con un rol en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'asmt_id',
    length: 26,
    comment:
      'Identificador de la evaluación realizada a un profesional con un rol en un proyecto de un cliente',
  })
  assessmentId: string;

  @ApiProperty({
    description:
      'Identificador del rol y el profesional en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'rpp_id',
    length: 26,
    comment:
      'Identificador del rol y el profesional en un proyecto de un cliente',
  })
  rolePerProfessionalId: string;

  @ApiProperty({
    description:
      'Identificador del usuario del sistema que realizó la evaluación',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'user_id',
    length: 26,
    comment: 'Identificador del usuario del sistema que realizó la evaluación',
  })
  userId: string;

  @ApiProperty({
    description: 'Observaciones generales sobre la evaluación',
    example: 'Persona con alto nivel de conocimientos',
    required: false,
    maxLength: 8192,
    type: String,
  })
  @Column('character varying', {
    name: 'asmt_observations',
    nullable: true,
    length: 8192,
    comment: 'Observaciones generales sobre la evaluación',
  })
  observations: string | null;

  @ApiProperty({
    description:
      'Puntaje total del assessment. Desde mínimo 0.00 a 5.00 máximo',
    example: 5.0,
    required: true,
    type: Number,
  })
  @Column('numeric', {
    name: 'asmt_score',
    precision: 3,
    scale: 2,
    default: () => '0.00',
    comment: 'Puntaje total del assessment. Desde mínimo 0.00 a 5.00 máximo',
  })
  score: number;

  @ApiProperty({
    description: 'Fecha y hora en que inició la evaluación',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'asmt_start_date',
    comment: 'Fecha y hora en que inició la evaluación',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Fecha y hora en que terminó la evaluación',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'asmt_end_date',
    nullable: true,
    comment: 'Fecha y hora en que terminó la evaluación',
  })
  endDate: Date | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'asmt_status',
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
    name: 'asmt_created_at',
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
    name: 'asmt_updated_at',
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
    name: 'asmt_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.assessments,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'rpp_id', referencedColumnName: 'rolePerProfessionalId' },
  ])
  rolePerProfessional: RolePerProfessional;

  @ManyToOne(() => Users, (users) => users.assessments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;

  @OneToMany(
    () => DomainAssessmentScores,
    (domainAssessmentScores) => domainAssessmentScores.assessment,
    { cascade: true },
  )
  domainAssessmentScores: DomainAssessmentScores[];

  @OneToMany(() => KnowledgeGaps, (knowledgeGaps) => knowledgeGaps.assessment, {
    cascade: true,
  })
  knowledgeGaps: KnowledgeGaps[];
}
