import { Assessments } from '@entities/assessments/assessments.entity';
import { Professionals } from '@entities/human-resources/professionals.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RolesProjectManagement } from './roles-projects-management.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index(
  'role_per_professional_professional_id_role_id_Idx',
  ['professionalId', 'roleId'],
  { unique: true, where: 'rpp_deleted_at IS NULL OR rpp_end_date IS NULL' },
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
    example: '01JB5XD7GCJW96XE1YV6V7BVJD',
    description: 'Identificador del rol y el profesional en el sistema',
  })
  @Column('character varying', {
    primary: true,
    name: 'rpp_id',
    length: 26,
    comment: 'Identificador del rol y el profesional en el sistema',
  })
  rolePerProfessionalId: string;

  @ApiProperty({
    example: '01JB5XD7GCJW96XE1YV6V7BVJD',
    description: 'Identificador del profesional en el sistema',
  })
  @Column('character varying', {
    name: 'professional_id',
    length: 26,
    comment: 'Identificador del profesional en el sistema',
  })
  professionalId: string;

  @ApiProperty({
    example: '01JB5XD7GCJW96XE1YV6V7BVJD',
    description: 'Identificador del rol en el sistema',
  })
  @Column('character varying', {
    name: 'role_id',
    length: 26,
    comment: 'Identificador del rol en el sistema',
  })
  roleId: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description:
      'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico',
  })
  @Column('timestamp without time zone', {
    name: 'rpp_start_date',
    comment:
      'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico',
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description:
      'Fecha y hora en que el profesional deja de participar en un proyecto de un cliente con un rol específico',
    nullable: true,
  })
  @Column('timestamp without time zone', {
    name: 'rpp_end_date',
    nullable: true,
    comment:
      'Fecha y hora en que el profesional deja de participar en un proyecto de un cliente con un rol específico',
  })
  endDate: Date | null;

  @ApiProperty({
    example: 'true',
    description: 'Estado del registro. True activo, False inactivo',
  })
  @Column('boolean', {
    name: 'rpp_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha y hora de creación del registro',
  })
  @Column('timestamp without time zone', {
    name: 'rpp_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha y hora de última actualización del registro',
    nullable: true,
  })
  @Column('timestamp without time zone', {
    name: 'rpp_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha y hora de borrado del registro',
    nullable: true,
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

  @ManyToOne(
    () => RolesProjectManagement,
    (roles) => roles.rolePerProfessionals,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: RolesProjectManagement;
}
