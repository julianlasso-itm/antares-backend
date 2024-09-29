import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from './roles.entity';
import { Users } from './users.entity';

@Index('user_per_role_user_id_role_id_Idx', ['roleId', 'userId'], {
  unique: true,
})
@Index('user_per_role_upr_status_Idx', ['deletedAt', 'status'], {})
@Index('pksec_user_per_role', ['userPerRoleId'], { unique: true })
@Entity('sec_user_per_role', { schema: 'security' })
export class UserPerRole {
  @ApiProperty({
    description: 'Identificador del rol y el usuario en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', { primary: true, name: 'upr_id', length: 26 })
  userPerRoleId: string;

  @ApiProperty({
    description: 'Identificador del usuario en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', { name: 'user_id', length: 26 })
  userId: string;

  @ApiProperty({
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', { name: 'role_id', length: 26 })
  roleId: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', { name: 'upr_status', default: () => 'true' })
  status: boolean;

  @ApiProperty({
    description: 'Fecha y hora de creación del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'upr_created_at',
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
    name: 'upr_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'Fecha y hora de borrado del registro',
    example: null,
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'upr_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => Roles, (roles) => roles.userPerRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userPerRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;
}
