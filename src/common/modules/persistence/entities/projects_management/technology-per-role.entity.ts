import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from './roles.entity';
import { TechnologyStack } from './technology-stack.entity';

@Index(
  'technology_per_role_ts_id_role_id_Idx',
  ['roleId', 'technologyStackId'],
  {
    unique: true,
    where: 'deletedAt IS NULL',
  },
)
@Index('technology_per_role_tpr_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_technology_per_role', ['technologyPerRoleId'], { unique: true })
@Entity('pm_technology_per_role', {
  schema: 'projects_management',
  comment:
    'Relación entre un rol y una tecnología en un stack tecnológico de un proyecto de un cliente',
})
export class TechnologyPerRole {
  @ApiProperty({
    description:
      'Identificador de la tecnología por rol en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'tpr_id',
    length: 26,
    comment:
      'Identificador de la tecnología por rol en un proyecto de un cliente',
  })
  technologyPerRoleId: string;

  @ApiProperty({
    description:
      'Identificador del stack tecnológico en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'ts_id',
    length: 26,
    comment: 'Identificador del stack tecnológico en un proyecto de un cliente',
  })
  technologyStackId: string;

  @ApiProperty({
    description: 'Identificador del rol en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'role_id',
    length: 26,
    comment: 'Identificador del rol en un proyecto de un cliente',
  })
  roleId: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'tpr_status',
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
    name: 'tpr_created_at',
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
    name: 'tpr_updated_at',
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
    name: 'tpr_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(() => Roles, (roles) => roles.technologyPerRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;

  @ManyToOne(
    () => TechnologyStack,
    (technologyStack) => technologyStack.technologyPerRoles,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'ts_id', referencedColumnName: 'technologyStackId' }])
  technologyStack: TechnologyStack;
}
