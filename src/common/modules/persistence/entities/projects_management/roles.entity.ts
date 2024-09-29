import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RolePerProfessional } from './role-per-professional.entity';
import { TechnologyPerRole } from './technology-per-role.entity';

@Index('roles_role_status_Idx', ['deletedAt', 'status'], {})
@Index('roles_roles_sub_role_id_Idx', ['deletedAt', 'subRoleId'], {})
@Index('pkpm_roles', ['roleId'], { unique: true })
@Index('roles_role_name_Idx', ['name'], { unique: true })
@Entity('pm_roles', { schema: 'projects_management' })
export class Roles {
  @ApiProperty({
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', { primary: true, name: 'role_id', length: 26 })
  roleId: string;

  @ApiProperty({
    description: 'Identificador del sub-rol que compone un rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'roles_sub_role_id',
    nullable: true,
    length: 26,
  })
  subRoleId: string | null;

  @ApiProperty({
    description: 'Nombre del rol en el sistema',
    example: 'Administrador',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', { name: 'role_name', length: 500 })
  name: string;

  @ApiProperty({
    description: 'Descripción del rol en el sistema',
    example: 'Rol para administrar el sistema',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @Column('character varying', {
    name: 'role_description',
    nullable: true,
    length: 2048,
  })
  description: string | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', { name: 'role_status', default: () => 'true' })
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
  })
  deletedAt: Date | null;

  @OneToMany(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.role,
  )
  rolePerProfessionals: RolePerProfessional[];

  @ManyToOne(() => Roles, (roles) => roles.roles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'roles_sub_role_id', referencedColumnName: 'roleId' }])
  subRole: Roles;

  @OneToMany(() => Roles, (roles) => roles.subRole)
  roles: Roles[];

  @OneToMany(
    () => TechnologyPerRole,
    (technologyPerRole) => technologyPerRole.role,
  )
  technologyPerRoles: TechnologyPerRole[];
}
