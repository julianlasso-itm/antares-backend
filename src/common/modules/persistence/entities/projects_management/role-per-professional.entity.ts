import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Assessments } from '../assessments';
import { Professionals } from '../human_resources';
import { Roles } from './roles.entity';

@Index(
  'role_per_professional_professional_id_role_id_Idx',
  ['professionalId', 'roleId'],
  { unique: true, where: 'deletedAt IS NULL' },
)
@Index('role_per_professional_rpp_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_role_per_professional', ['rolePerProfessionalId'], {
  unique: true,
})
@Entity('pm_role_per_professional', {
  schema: 'projects_management',
  comment:
    'Relación entre un profesional y un rol en un proyecto de un cliente',
})
export class RolePerProfessional {
  @ApiProperty({
    description:
      'Identificador del rol y el profesional en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'rpp_id',
    length: 26,
    comment: 'Identificador del rol y el profesional en el sistema',
  })
  rolePerProfessionalId: string;

  @ApiProperty({
    description: 'Identificador del profesional en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'professional_id',
    length: 26,
    comment: 'Identificador del profesional en el sistema',
  })
  professionalId: string;

  @ApiProperty({
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'role_id',
    length: 26,
    comment: 'Identificador del rol en el sistema',
  })
  roleId: string;

  @ApiProperty({
    description:
      'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'rpp_start_date',
    comment:
      'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico',
  })
  startDate: Date;

  @ApiProperty({
    description:
      'Fecha y hora en que el profesional deja de participar en un proyecto de un cliente con un rol específico',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'rpp_end_date',
    nullable: true,
    comment:
      'Fecha y hora en que el profesional deja de participar en un proyecto de un cliente con un rol específico',
  })
  endDate: Date | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'rpp_status',
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
    name: 'rpp_created_at',
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
    name: 'rpp_updated_at',
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
    name: 'rpp_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => Assessments,
    (assessments) => assessments.rolePerProfessional,
  )
  assessments: Assessments[];

  @ManyToOne(
    () => Professionals,
    (professionals) => professionals.rolePerProfessionals,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'professional_id', referencedColumnName: 'professionalId' },
  ])
  professional: Professionals;

  @ManyToOne(() => Roles, (roles) => roles.rolePerProfessionals, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;
}
