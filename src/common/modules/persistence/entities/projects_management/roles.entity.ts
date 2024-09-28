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
  @Column('character varying', { primary: true, name: 'role_id', length: 26 })
  roleId: string;

  @Column('character varying', {
    name: 'roles_sub_role_id',
    nullable: true,
    length: 26,
  })
  subRoleId: string | null;

  @Column('character varying', { name: 'role_name', length: 500 })
  name: string;

  @Column('character varying', {
    name: 'role_description',
    nullable: true,
    length: 2048,
  })
  description: string | null;

  @Column('boolean', { name: 'role_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'role_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'role_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

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
