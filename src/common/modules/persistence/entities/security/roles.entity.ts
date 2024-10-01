import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserPerRole } from './user-per-role.entity';

@Index('roles_role_status_Idx', ['status', 'deletedAt'], {})
@Index('pksec_roles', ['roleId'], { unique: true })
@Index('roles_role_name_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('sec_roles', {
  schema: 'security',
  comment: 'Roles del sistema ANTARES',
})
export class Roles {
  @ApiProperty({
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'role_id',
    length: 26,
    comment: 'Identificador del rol en el sistema',
  })
  roleId: string;

  @ApiProperty({
    description: 'Nombre del rol en el sistema',
    example: 'Administrador',
    required: true,
    maxLength: 50,
    type: String,
  })
  @Column('character varying', {
    name: 'role_name',
    length: 50,
    comment: 'Nombre del rol en el sistema',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del rol en el sistema',
    example: 'Rol para administrar el sistema',
    required: false,
    maxLength: 1024,
    type: String,
  })
  @Column('character varying', {
    name: 'role_description',
    length: 1024,
    comment: 'Descripción del rol en el sistema',
  })
  description: string;

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
    examples: ['2023-03-30T12:00:00.000Z', null],
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
    example: null,
    examples: ['2023-03-30T12:00:00.000Z', null],
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'role_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(() => UserPerRole, (userPerRole) => userPerRole.role)
  userPerRoles: UserPerRole[];
}
