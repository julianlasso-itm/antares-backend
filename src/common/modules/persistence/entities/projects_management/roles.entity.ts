import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RolePerProfessional } from './role-per-professional.entity';
import { TechnologyPerRole } from './technology-per-role.entity';

@Index('roles_role_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_roles', ['roleId'], { unique: true })
@Index('roles_role_name_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('pm_roles', {
  schema: 'projects_management',
  comment: 'Roles en los proyectos de un cliente',
})
export class Roles {
  @ApiProperty({
    description: 'Identificador del rol en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'role_id',
    length: 26,
    comment: 'Identificador del rol en un proyecto de un cliente',
  })
  roleId: string;

  @ApiProperty({
    description: 'Nombre del rol en un proyecto de un cliente',
    example: 'Backend Developer',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'role_name',
    length: 500,
    comment: 'Nombre del rol en un proyecto de un cliente',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del rol en el sistema',
    example: 'Rol para desarrollar aplicaciones backend',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @Column('character varying', {
    name: 'role_description',
    nullable: true,
    length: 2048,
    comment: 'Descripción del rol en un proyecto de un cliente',
  })
  description?: string | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'role_status',
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
    name: 'role_created_at',
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
    name: 'role_updated_at',
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
    name: 'role_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.role,
  )
  rolePerProfessionals: RolePerProfessional[];

  @OneToMany(
    () => TechnologyPerRole,
    (technologyPerRole) => technologyPerRole.role,
  )
  technologyPerRoles: TechnologyPerRole[];
}
